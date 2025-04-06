function isMobileView() {
    return window.innerWidth <= 768
}

function renderPromoHeading(spans, alignment) {
    let headingHTML = "";
    if (isMobileView()) {
        alignment = "center"
    }
    spans.forEach(part => {
        if (part.br) {
            headingHTML += "<br />";
        } else if (part.icon) {
            let style = '';
            if (part.color) style += `color: ${part.color};`;
            if (part.weight) style += `font-weight: ${part.weight};`;
            if (part.size) style += `font-size: ${isMobileView() ? '16px' :part.size};`;
        
            headingHTML += `
                <div style="display: flex; align-items: center; gap: 6px; line-height: 1.2; margin: 4px 0;">
                    <img src="${part.icon}" alt="icon" style="height: 1em; display: inline-block;" />
                    <span style="${style} display: inline-block; vertical-align: middle;">
                    ${part.text}
                    </span>
                </div>
                `;
          } else {
            headingHTML += `<span style="${part.color ? `color: ${part.color};` : ''} ${part.weight ? `font-weight: ${part.weight};` : ''} ${part.size ? `font-size: ${part.size};` : ''}">${part.text}</span> `;
        }
    });

    const headingElement = document.querySelector(".promo-heading");
    if (headingElement) {
        headingElement.innerHTML = headingHTML.trim();
        headingElement.style.textAlign = alignment || "center";
        const contentElement = document.querySelector(".promo-content");
        contentElement.style.alignItems = (alignment == "left") ? "flex-start" : "center";
    }

}

async function loadTemplate(path, containerSelector, config = {}) {
    try {
        const response = await fetch(path);
        let html = await response.text();

        html = html.replace(/{{(.*?)}}/g, (_, key) => config[key.trim()] || "");

        const container = document.querySelector(containerSelector);
        if (container) {
            container.insertAdjacentHTML("beforeend", html);
        }
    } catch (error) {
        console.error(`Failed to load template: ${path}`, error);
    }
}

async function fetchPromoConfig(type) {
    try {
        const response = await fetch('../config/promoConfig.json');
        const promo = await response.json();
        console.log(promo[type]);
        return promo[type];
    } catch (error) {
        console.error("Error fetching promo config:", error);
        return null;
    }
}

async function loadPromo(configType) {

    const promo = await fetchPromoConfig(configType);
    const promoConfig = promo.config;
    const promoVariant = promo.variant;

    await loadTemplate(`left-decor/variant-${promoVariant["left-decor"]}.html`, ".promo-wrapper", promoConfig);
    // await loadTemplate("right-decor/variant-a.html", ".promo-wrapper");
    await loadTemplate(`promo-image/background/variant-${promoVariant["promo-bg"]}.html`, ".promo-wrapper", promoConfig);
    await loadTemplate(`promo-image/foreground/variant-${promoVariant["promo-fg"]}.html`, ".promo-wrapper", promoConfig);
    await loadTemplate(`promo-content/variant-${promoVariant["promo-conetent"]}.html`, ".promo-wrapper", promoConfig);

    const bgEl = document.querySelector(".promo-image-bg");
    if (bgEl) {
        bgEl.style.background = promoConfig.promoBgColor;
    }
    if (promoConfig.phoneNumber) {
        const callButtonHTML = `
            <button class="call-now-btn" onclick="window.location.href='tel:${promoConfig.phoneNumber}'">
            <div class="call-now-icon">
                <img src="https://img.icons8.com/ios-filled/24/000000/phone.png" alt="Call" />
            </div>
            <div class="call-now-text">CALL NOW</div>
            </button>
            `;
        document.getElementById("call-button-placeholder").innerHTML = callButtonHTML;
    } else if (promoConfig.durations) {
        const durationHTML = `
            <div class="duration-box">
                <span class="label">Duration:</span>
                <span class="value">${promoConfig.durations}</span>
            </div>
        `
        document.getElementById("call-button-placeholder").innerHTML = durationHTML;
    }  else if (promoConfig.textInsideBox) {
        const bgStyle = promoConfig.textBoxBgColor && !isMobileView()
          ? `style="background-color: ${promoConfig.textBoxBgColor};"`
          : "";
        const textBoxHTML = `
          <div class="outer-box" ${bgStyle}>
            <div class="inner-box">
              <p>${promoConfig.textInsideBox}</p>
            </div>
          </div>
        `;
        document.getElementById("call-button-placeholder").innerHTML = textBoxHTML;
      }
    renderPromoHeading(promoConfig.headingSpans, promoConfig.headingAlignment);
}

// Load all the modular parts
window.addEventListener("DOMContentLoaded", async () => {
    const params = new URLSearchParams(window.location.search);
    const configType = params.get("type");
    if (configType) {
        await loadPromo(configType);
    } else {
        console.warn("No config type specified in the URL.");
        // Optionally fallback to default:
        await loadPromo("promo1");
    }
});
