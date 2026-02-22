const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!prefersReducedMotion) {
    const onScroll = () => {
        const shift = Math.min(window.scrollY * 0.03, 28);
        document.documentElement.style.setProperty("--parallax-shift", `${shift.toFixed(2)}px`);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
}

const revealNodes = document.querySelectorAll("[data-reveal]");

if (prefersReducedMotion) {
    revealNodes.forEach((node) => node.classList.add("reveal-visible"));
} else if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
        (entries, obs) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("reveal-visible");
                    obs.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.14, rootMargin: "0px 0px -8% 0px" }
    );

    revealNodes.forEach((node) => observer.observe(node));
} else {
    revealNodes.forEach((node) => node.classList.add("reveal-visible"));
}
