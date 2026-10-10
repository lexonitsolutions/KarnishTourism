"use client";

import { useState } from "react";

export default function VisaDocumentChecklist({ documents }) {
  const [checkedItems, setCheckedItems] = useState({});

  const toggleCheck = (id) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const totalItems = documents?.reduce((acc, cat) => acc + cat.items.length, 0) || 0;
  const checkedCount = Object.values(checkedItems).filter(Boolean).length;
  const percentReady = totalItems > 0 ? Math.round((checkedCount / totalItems) * 100) : 0;

  return (
    <div className="kt-doc-checklist-card">
      <div className="kt-checklist-header">
        <div>
          <span className="kt-checklist-kicker">Interactive Document Audit</span>
          <h3>Required Documents Checklist</h3>
          <p>Click each document to check off what you already have ready.</p>
        </div>
        <div className="kt-readiness-meter">
          <div className="kt-meter-circle">
            <span>{percentReady}%</span>
          </div>
          <small>Document Readiness</small>
        </div>
      </div>

      <div className="kt-doc-categories">
        {documents?.map((cat, catIdx) => (
          <div key={cat.category} className="kt-doc-group">
            <h4>
              <i className="ti-folder" /> {cat.category}
            </h4>
            <div className="kt-doc-items">
              {cat.items.map((item, itemIdx) => {
                const itemId = `doc-${catIdx}-${itemIdx}`;
                const isChecked = !!checkedItems[itemId];
                return (
                  <label
                    key={itemId}
                    className={`kt-checklist-item ${isChecked ? "checked" : ""}`}
                    onClick={() => toggleCheck(itemId)}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => {}} // handled by label click
                    />
                    <span className="kt-check-box">
                      <i className="ti-check" />
                    </span>
                    <span className="kt-check-text">{item}</span>
                  </label>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="kt-doc-help-footer">
        <div className="kt-help-text">
          <i className="ti-info-alt" />
          <span>
            Missing a specific document or need an employer NOC template? Our documentation team provides ready-to-use drafts.
          </span>
        </div>
        <a href="#apply" className="kt-btn-jump-apply">
          Ready to Apply <i className="ti-arrow-right" />
        </a>
      </div>
    </div>
  );
}
