const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Organization = require("../models/Organization");
const TourPackage = require("../models/TourPackage");
const Booking = require("../models/Booking");
const Commission = require("../models/Commission");

async function seedTestAccounts() {
  try {
    const adminPassHash = await bcrypt.hash("Admin@123456", 12);
    const partnerPassHash = await bcrypt.hash("Partner@123456", 12);
    const customerPassHash = await bcrypt.hash("Customer@123456", 12);

    // 1. Ensure Admin
    let admin = await User.findOne({ email: "admin@karnishtourism.com" });
    if (!admin) {
      admin = await User.create({
        name: "Karnish Administrator",
        email: "admin@karnishtourism.com",
        passwordHash: adminPassHash,
        role: "super_admin",
        status: "active",
      });
    } else {
      admin.passwordHash = adminPassHash;
      admin.role = "super_admin";
      admin.status = "active";
      await admin.save();
    }

    // 2. Ensure Sample Partner Organization
    let org = await Organization.findOne({ slug: "apex-luxury-travel" });
    if (!org) {
      org = await Organization.create({
        name: "Apex Luxury Travel DMC",
        slug: "apex-luxury-travel",
        type: "travel_agency",
        contactEmail: "partner@karnishtourism.com",
        contactPhone: "+91 98490 11223",
        taxId: "GSTIN36AAAAA0000A1Z5",
        commissionRate: 15,
        tier: "gold",
        status: "approved",
      });
    }

    // 3. Ensure Sample Partner User
    let partner = await User.findOne({ email: "partner@karnishtourism.com" });
    if (!partner) {
      partner = await User.create({
        name: "Farhan Merchant",
        email: "partner@karnishtourism.com",
        passwordHash: partnerPassHash,
        role: "collaborator",
        status: "active",
        organization: org._id,
        collaboratorProfile: {
          companyName: "Apex Luxury Travel DMC",
          taxId: "GSTIN36AAAAA0000A1Z5",
          approvalStatus: "approved",
          commissionRate: 15,
          tier: "gold",
        },
      });
    } else {
      partner.passwordHash = partnerPassHash;
      partner.role = "collaborator";
      partner.status = "active";
      partner.organization = org._id;
      partner.collaboratorProfile = {
        companyName: "Apex Luxury Travel DMC",
        taxId: "GSTIN36AAAAA0000A1Z5",
        approvalStatus: "approved",
        commissionRate: 15,
        tier: "gold",
      };
      await partner.save();
    }

    // 4. Ensure Sample Customer User
    let customer = await User.findOne({ email: "customer@karnishtourism.com" });
    if (!customer) {
      customer = await User.create({
        name: "Aarav Mehta",
        email: "customer@karnishtourism.com",
        passwordHash: customerPassHash,
        role: "customer",
        status: "active",
      });
    } else {
      customer.passwordHash = customerPassHash;
      customer.role = "customer";
      customer.status = "active";
      await customer.save();
    }

    // 5. Seed sample B2B booking if none exist for partner
    const existingB2bBooking = await Booking.findOne({ collaborator: partner._id });
    if (!existingB2bBooking) {
      const samplePkg = await TourPackage.findOne({ status: "active" });
      if (samplePkg) {
        const bkg = await Booking.create({
          bookingId: `KT-B2B-89104-APEX`,
          user: partner._id,
          collaborator: partner._id,
          organization: org._id,
          package: samplePkg._id,
          travelDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          numberOfTravelers: 2,
          adultCount: 2,
          childCount: 0,
          contactInformation: {
            name: "Rajesh Singhania",
            email: "singhania.client@example.com",
            phone: "+91 98111 22334",
          },
          clientDetails: {
            name: "Rajesh Singhania",
            email: "singhania.client@example.com",
            phone: "+91 98111 22334",
            notes: "VIP anniversary arrangement requested",
          },
          totalAmount: samplePkg.price * 2,
          currency: "INR",
          paymentStatus: "paid",
          bookingStatus: "confirmed",
          commissionAmount: Math.round(samplePkg.price * 2 * 0.15),
          commissionRate: 15,
          commissionStatus: "approved",
          invoiceNumber: "INV-2026-89104",
        });

        await Commission.create({
          collaborator: partner._id,
          organization: org._id,
          booking: bkg._id,
          bookingAmount: samplePkg.price * 2,
          commissionRate: 15,
          amount: Math.round(samplePkg.price * 2 * 0.15),
          currency: "INR",
          status: "approved",
          invoiceNumber: "INV-2026-89104",
        });
      }
    }

    console.log("[Seed] Verified Admin, Partner, and Customer accounts in MongoDB");
  } catch (error) {
    console.warn("[Seed] seedTestAccounts warning:", error.message);
  }
}

module.exports = { seedTestAccounts };
