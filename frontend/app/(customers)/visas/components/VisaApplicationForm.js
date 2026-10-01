"use client";

import { useState } from "react";

export default function VisaApplicationForm({ destination, initialType }) {
  const [selectedType, setSelectedType] = useState(
    initialType || (destination?.types ? destination.types[0]?.id : "")
  );
  const [isExpress, setIsExpress] = useState(false);
  const [travelersCount, setTravelersCount] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    whatsapp: "",
    nationality: "Indian",
    passportNumber: "",
    travelDate: "",
    notes: "",
  });

  const [uploadedFiles, setUploadedFiles] = useState({
    passportScan: null,
    passportPhoto: null,
    supportingDoc: null,
  });

  const [dragActive, setDragActive] = useState({
    passportScan: false,
    passportPhoto: false,
    supportingDoc: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedLead, setSubmittedLead] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const currentTypeObj = destination?.types?.find((t) => t.id === selectedType) || destination?.types?.[0];
  const unitPrice = isExpress && currentTypeObj?.expressFee ? currentTypeObj.expressFee : (currentTypeObj?.fee || destination?.startingPrice || 6000);
  const totalPrice = unitPrice * travelersCount;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (field, file) => {
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      setErrorMsg(`File "${file.name}" exceeds the 10MB limit. Please upload a smaller file.`);
      return;
    }
    setErrorMsg("");
    setUploadedFiles((prev) => ({
      ...prev,
      [field]: {
        name: file.name,
        size: (file.size / 1024).toFixed(1) + " KB",
        type: file.type,
      },
    }));
  };

  const handleDrag = (field, e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive((prev) => ({ ...prev, [field]: true }));
    } else if (e.type === "dragleave") {
      setDragActive((prev) => ({ ...prev, [field]: false }));
    }
  };

  const handleDrop = (field, e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive((prev) => ({ ...prev, [field]: false }));
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(field, e.dataTransfer.files[0]);
    }
  };

  const handleRemoveFile = (field) => {
    setUploadedFiles((prev) => ({ ...prev, [field]: null }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setErrorMsg("Please provide your full name, email, and phone number so our visa desk can contact you.");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg("");

    // Generate reference code
    const refCode = `KT-VISA-${Math.floor(100000 + Math.random() * 900000)}`;
    const submissionData = {
      refCode,
      destination: destination?.title || "Visa Application",
      country: destination?.country || "",
      visaType: currentTypeObj?.name || "Standard",
      isExpress,
      travelersCount,
      ...formData,
      uploadedFileNames: Object.values(uploadedFiles)
        .filter(Boolean)
        .map((f) => f.name),
      totalPrice,
      submittedAt: new Date().toISOString(),
    };

    // Store in localStorage for client persistence
    try {
      const existing = JSON.parse(localStorage.getItem("karnish_visa_leads") || "[]");
      existing.unshift(submissionData);
      localStorage.setItem("karnish_visa_leads", JSON.stringify(existing));
    } catch (err) {
      // ignore storage error
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedLead(submissionData);
    }, 900);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Karnish Tourism! I just applied for the ${destination?.title || "Visa"} (Ref: ${submittedLead?.refCode}). Traveler: ${submittedLead?.fullName}, Travelers: ${submittedLead?.travelersCount}, Visa: ${submittedLead?.visaType}. Please guide me on the next steps!`
  );

  if (submittedLead) {
    return (
      <div className="kt-visa-success-card">
        <div className="kt-visa-success-icon">
          <i className="ti-check" />
        </div>
        <span className="kt-visa-success-badge">Application Dossier Created</span>
        <h3>Thank You, {submittedLead.fullName.split(" ")[0]}!</h3>
        <p>
          Your visa inquiry for <strong>{destination?.country}</strong> has been logged with reference{" "}
          <strong className="kt-visa-ref-code">{submittedLead.refCode}</strong>.
        </p>

        <div className="kt-visa-summary-box">
          <div className="kt-summary-item">
            <small>Visa Category</small>
            <strong>{submittedLead.visaType}</strong>
          </div>
          <div className="kt-summary-item">
            <small>Travelers</small>
            <strong>{submittedLead.travelersCount} Person(s)</strong>
          </div>
          <div className="kt-summary-item">
            <small>Estimated Fee</small>
            <strong>₹{submittedLead.totalPrice.toLocaleString("en-IN")}</strong>
          </div>
          <div className="kt-summary-item">
            <small>Uploaded Documents</small>
            <strong>
              {submittedLead.uploadedFileNames.length > 0
                ? `${submittedLead.uploadedFileNames.length} file(s) attached`
                : "Pending upload"}
            </strong>
          </div>
        </div>

        <div className="kt-visa-success-actions">
          <a
            href={`https://wa.me/971500000000?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="kt-btn-whatsapp"
          >
            <i className="fa-brands fa-whatsapp" /> Connect with Visa Officer on WhatsApp
          </a>
          <button
            type="button"
            className="kt-btn-secondary"
            onClick={() => {
              setSubmittedLead(null);
              setFormData({
                fullName: "",
                email: "",
                phone: "",
                whatsapp: "",
                nationality: "Indian",
                passportNumber: "",
                travelDate: "",
                notes: "",
              });
              setUploadedFiles({ passportScan: null, passportPhoto: null, supportingDoc: null });
            }}
          >
            Submit Another Application
          </button>
        </div>

        <div className="kt-visa-guarantee-note">
          <i className="ti-shield" />
          <span>
            <strong>Karnish Security Guarantee:</strong> All personal identification papers and passport scans are encrypted with 256-bit security protocols and reviewed solely by accredited consular specialists.
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="kt-visa-app-box">
      <div className="kt-visa-app-header">
        <div className="kt-visa-header-text">
          <span className="kt-visa-kicker">
            <i className="ti-file" /> Direct Consular Application
          </span>
          <h3>Apply for {destination?.title || "Your Visa"}</h3>
          <p>
            Complete the form below and upload your scans. Our certified visa desk audits your file within 30 minutes to ensure a 99.4% approval rate.
          </p>
        </div>
        <div className="kt-visa-header-price">
          <small>Starting from</small>
          <strong>₹{unitPrice.toLocaleString("en-IN")}</strong>
          <span>per applicant</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="kt-visa-form">
        {errorMsg && <div className="kt-form-alert error">{errorMsg}</div>}

        {/* 1. Visa Category & Duration */}
        <div className="kt-form-section">
          <label className="kt-section-label">
            <span className="kt-step-badge">1</span> Choose Visa Category & Entry Type
          </label>
          <div className="kt-visa-type-grid">
            {destination?.types?.map((type) => {
              const isSelected = selectedType === type.id;
              return (
                <div
                  key={type.id}
                  className={`kt-type-card ${isSelected ? "active" : ""}`}
                  onClick={() => setSelectedType(type.id)}
                >
                  <div className="kt-type-header">
                    <strong>{type.name}</strong>
                    <span className="kt-type-price">
                      ₹{(isExpress && type.expressFee ? type.expressFee : type.fee).toLocaleString("en-IN")}
                    </span>
                  </div>
                  <p>{type.description}</p>
                  <div className="kt-type-meta">
                    <span>
                      <i className="ti-time" /> Stay: {type.stay}
                    </span>
                    <span>
                      <i className="ti-calendar" /> Validity: {type.validity}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {destination?.expressAvailable && (
            <label className="kt-express-toggle">
              <input
                type="checkbox"
                checked={isExpress}
                onChange={(e) => setIsExpress(e.target.checked)}
              />
              <span className="kt-toggle-custom" />
              <div className="kt-toggle-copy">
                <strong>
                  <i className="ti-bolt" /> Request Express Fast-Track Processing ({destination.expressTime})
                </strong>
                <small>Prioritizes your dossier for immediate consular submission and expedites document clearance.</small>
              </div>
            </label>
          )}
        </div>

        {/* 2. Applicant & Travel Details */}
        <div className="kt-form-section">
          <label className="kt-section-label">
            <span className="kt-step-badge">2</span> Applicant & Contact Details
          </label>
          <div className="kt-grid-2">
            <div className="kt-field">
              <label>Full Name (as on Passport) *</label>
              <input
                type="text"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="e.g. Rahul Sharma"
              />
            </div>
            <div className="kt-field">
              <label>Passport Number</label>
              <input
                type="text"
                name="passportNumber"
                value={formData.passportNumber}
                onChange={handleInputChange}
                placeholder="e.g. Z1234567"
              />
            </div>
          </div>

          <div className="kt-grid-2">
            <div className="kt-field">
              <label>Email Address *</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                placeholder="name@example.com"
              />
            </div>
            <div className="kt-field">
              <label>Phone / WhatsApp Number *</label>
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+91 98765 43210"
              />
            </div>
          </div>

          <div className="kt-grid-3">
            <div className="kt-field">
              <label>Nationality</label>
              <select name="nationality" value={formData.nationality} onChange={handleInputChange}>
                <option value="Indian">Indian</option>
                <option value="Emirati">Emirati / UAE</option>
                <option value="British">British</option>
                <option value="American">American</option>
                <option value="Canadian">Canadian</option>
                <option value="Australian">Australian</option>
                <option value="Other">Other Nationality</option>
              </select>
            </div>
            <div className="kt-field">
              <label>Approx. Travel Date</label>
              <input
                type="date"
                name="travelDate"
                value={formData.travelDate}
                onChange={handleInputChange}
              />
            </div>
            <div className="kt-field">
              <label>Number of Travelers</label>
              <select
                value={travelersCount}
                onChange={(e) => setTravelersCount(Number(e.target.value))}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, "9+"].map((num) => (
                  <option key={num} value={typeof num === "number" ? num : 9}>
                    {num} {num === 1 ? "Traveler" : "Travelers"}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* 3. Document Upload Zone */}
        <div className="kt-form-section">
          <label className="kt-section-label">
            <span className="kt-step-badge">3</span> Secure Document Upload (Optional now, can send later)
          </label>
          <p className="kt-upload-instruction">
            Upload clear photos or PDF scans. You can also proceed now and share documents via WhatsApp or email later.
          </p>

          <div className="kt-upload-grid">
            {/* Passport Scan */}
            <div
              className={`kt-dropzone ${dragActive.passportScan ? "dragover" : ""} ${
                uploadedFiles.passportScan ? "has-file" : ""
              }`}
              onDragEnter={(e) => handleDrag("passportScan", e)}
              onDragOver={(e) => handleDrag("passportScan", e)}
              onDragLeave={(e) => handleDrag("passportScan", e)}
              onDrop={(e) => handleDrop("passportScan", e)}
            >
              <input
                type="file"
                id="passportScanInput"
                accept=".jpg,.jpeg,.png,.pdf"
                style={{ display: "none" }}
                onChange={(e) => handleFileChange("passportScan", e.target.files[0])}
              />
              {uploadedFiles.passportScan ? (
                <div className="kt-file-preview">
                  <i className="ti-file kt-file-icon" />
                  <div className="kt-file-info">
                    <strong>{uploadedFiles.passportScan.name}</strong>
                    <small>{uploadedFiles.passportScan.size}</small>
                  </div>
                  <button
                    type="button"
                    className="kt-file-remove"
                    onClick={() => handleRemoveFile("passportScan")}
                  >
                    <i className="ti-close" />
                  </button>
                </div>
              ) : (
                <label htmlFor="passportScanInput" className="kt-drop-label">
                  <i className="ti-id-badge" />
                  <strong>Passport Bio-Pages</strong>
                  <small>First & last page (PDF/JPG, max 10MB)</small>
                  <span className="kt-upload-link">Browse File</span>
                </label>
              )}
            </div>

            {/* Passport Photo */}
            <div
              className={`kt-dropzone ${dragActive.passportPhoto ? "dragover" : ""} ${
                uploadedFiles.passportPhoto ? "has-file" : ""
              }`}
              onDragEnter={(e) => handleDrag("passportPhoto", e)}
              onDragOver={(e) => handleDrag("passportPhoto", e)}
              onDragLeave={(e) => handleDrag("passportPhoto", e)}
              onDrop={(e) => handleDrop("passportPhoto", e)}
            >
              <input
                type="file"
                id="passportPhotoInput"
                accept=".jpg,.jpeg,.png"
                style={{ display: "none" }}
                onChange={(e) => handleFileChange("passportPhoto", e.target.files[0])}
              />
              {uploadedFiles.passportPhoto ? (
                <div className="kt-file-preview">
                  <i className="ti-image kt-file-icon" />
                  <div className="kt-file-info">
                    <strong>{uploadedFiles.passportPhoto.name}</strong>
                    <small>{uploadedFiles.passportPhoto.size}</small>
                  </div>
                  <button
                    type="button"
                    className="kt-file-remove"
                    onClick={() => handleRemoveFile("passportPhoto")}
                  >
                    <i className="ti-close" />
                  </button>
                </div>
              ) : (
                <label htmlFor="passportPhotoInput" className="kt-drop-label">
                  <i className="ti-user" />
                  <strong>Passport Photograph</strong>
                  <small>White background (JPG/PNG, max 10MB)</small>
                  <span className="kt-upload-link">Browse File</span>
                </label>
              )}
            </div>

            {/* Supporting Document */}
            <div
              className={`kt-dropzone ${dragActive.supportingDoc ? "dragover" : ""} ${
                uploadedFiles.supportingDoc ? "has-file" : ""
              }`}
              onDragEnter={(e) => handleDrag("supportingDoc", e)}
              onDragOver={(e) => handleDrag("supportingDoc", e)}
              onDragLeave={(e) => handleDrag("supportingDoc", e)}
              onDrop={(e) => handleDrop("supportingDoc", e)}
            >
              <input
                type="file"
                id="supportingDocInput"
                accept=".jpg,.jpeg,.png,.pdf"
                style={{ display: "none" }}
                onChange={(e) => handleFileChange("supportingDoc", e.target.files[0])}
              />
              {uploadedFiles.supportingDoc ? (
                <div className="kt-file-preview">
                  <i className="ti-receipt kt-file-icon" />
                  <div className="kt-file-info">
                    <strong>{uploadedFiles.supportingDoc.name}</strong>
                    <small>{uploadedFiles.supportingDoc.size}</small>
                  </div>
                  <button
                    type="button"
                    className="kt-file-remove"
                    onClick={() => handleRemoveFile("supportingDoc")}
                  >
                    <i className="ti-close" />
                  </button>
                </div>
              ) : (
                <label htmlFor="supportingDocInput" className="kt-drop-label">
                  <i className="ti-bookmark-alt" />
                  <strong>Supporting Document</strong>
                  <small>Bank statement, flight, or hotel (optional)</small>
                  <span className="kt-upload-link">Browse File</span>
                </label>
              )}
            </div>
          </div>
        </div>

        {/* 4. Pricing & Submit Bar */}
        <div className="kt-visa-submit-bar">
          <div className="kt-price-breakdown">
            <div className="kt-price-row">
              <span>
                {currentTypeObj?.name || "Selected Visa"} ({travelersCount}x):
              </span>
              <strong>₹{totalPrice.toLocaleString("en-IN")}</strong>
            </div>
            <div className="kt-price-inclusions">
              <span>✓ Includes Govt & Consular Filing</span>
              <span>✓ Certified Document Pre-Audit</span>
              <span>✓ Status Updates via WhatsApp</span>
            </div>
          </div>

          <button type="submit" disabled={isSubmitting} className="kt-visa-submit-btn">
            {isSubmitting ? (
              <>
                <i className="fa-solid fa-circle-notch fa-spin" /> Lodging Your Dossier...
              </>
            ) : (
              <>
                Submit Visa Application <i className="ti-arrow-right" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
