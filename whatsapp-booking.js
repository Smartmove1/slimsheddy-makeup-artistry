/* ============================================
   SLIMSHEDDY MAKEUP ARTISTRY — whatsapp-booking.js
   WhatsApp Booking Form Handler
   ============================================ */

(function () {
  "use strict";

  const WHATSAPP_NUMBER = "234813475298";

  const submitBtn = document.getElementById("submitBooking");

  function getVal(id) {
    const el = document.getElementById(id);
    return el ? el.value.trim() : "";
  }

  function formatDate(dateStr) {
    if (!dateStr) return "Not specified";
    const d = new Date(dateStr);
    if (isNaN(d)) return dateStr;
    return d.toLocaleDateString("en-NG", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  function validateForm() {
    const required = [
      { id: "fullName", label: "Full Name" },
      { id: "phoneNumber", label: "Phone Number" },
      { id: "serviceType", label: "Service Type" },
      { id: "eventType", label: "Event Type" },
      { id: "eventDate", label: "Event Date" },
      { id: "eventLocation", label: "Event Location" },
    ];

    for (const field of required) {
      const val = getVal(field.id);
      const el = document.getElementById(field.id);
      if (!val) {
        if (el) {
          el.focus();
          el.style.borderColor = "#e05050";
          setTimeout(() => {
            el.style.borderColor = "";
          }, 2000);
        }
        showToast(`Please fill in: ${field.label}`, "error");
        return false;
      }
    }
    return true;
  }

  function buildWhatsAppMessage() {
    const name = getVal("fullName");
    const phone = getVal("phoneNumber");
    const email = getVal("emailAddress") || "Not provided";
    const service = getVal("serviceType");
    const eventType = getVal("eventType");
    const eventDate = formatDate(getVal("eventDate"));
    const location = getVal("eventLocation");
    const style = getVal("makeupStyle") || "Not specified";
    const travel = getVal("travelRequired") || "No";
    const budget = getVal("budget") || "Not specified";
    const notes = getVal("additionalNotes") || "None";

    const message = `Hello Slimsheddy Makeup Artistry,

I would like to book an appointment.

*Name:* ${name}
*Phone Number:* ${phone}
*Email:* ${email}
*Service:* ${service}
*Event Type:* ${eventType}
*Event Date:* ${eventDate}
*Location:* ${location}
*Preferred Style:* ${style}
*Travel Required:* ${travel}
*Budget:* ${budget}

*Additional Notes:*
${notes}

Please let me know your availability. Thank you! 🌸`;

    return message;
  }

  function openWhatsApp() {
    if (!validateForm()) return;

    const message = buildWhatsAppMessage();
    const encodedMsg = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMsg}`;

    showToast("Redirecting to WhatsApp...", "success");

    setTimeout(() => {
      window.open(whatsappURL, "_blank", "noopener,noreferrer");
    }, 600);
  }

  // Toast notification
  function showToast(message, type) {
    // Remove existing toasts
    const existing = document.querySelector(".booking-toast");
    if (existing) existing.remove();

    const toast = document.createElement("div");
    toast.className = `booking-toast booking-toast--${type}`;
    toast.textContent = message;
    toast.style.cssText = `
      position: fixed;
      bottom: 30px;
      left: 50%;
      transform: translateX(-50%) translateY(20px);
      background: ${type === "success" ? "#25D366" : "#e05050"};
      color: white;
      font-family: 'Jost', sans-serif;
      font-size: 0.85rem;
      font-weight: 500;
      padding: 14px 26px;
      border-radius: 4px;
      box-shadow: 0 8px 30px rgba(0,0,0,0.2);
      z-index: 9000;
      opacity: 0;
      transition: opacity 0.3s ease, transform 0.3s ease;
      white-space: nowrap;
    `;

    document.body.appendChild(toast);

    // Animate in
    requestAnimationFrame(() => {
      toast.style.opacity = "1";
      toast.style.transform = "translateX(-50%) translateY(0)";
    });

    // Remove after 3.5s
    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateX(-50%) translateY(20px)";
      setTimeout(() => toast.remove(), 400);
    }, 3500);
  }

  // Attach submit handler
  if (submitBtn) {
    submitBtn.addEventListener("click", openWhatsApp);
  }

  // Clear error highlight on input
  ["fullName", "phoneNumber", "serviceType", "eventType", "eventDate", "eventLocation"].forEach(
    (id) => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener("input", () => {
          el.style.borderColor = "";
        });
      }
    }
  );
})();
