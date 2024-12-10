import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";

const ScrollButtons = () => {

    const [showScrollToTop, setShowScrollToTop] = useState(false);
    const [isAtBottom, setIsAtBottom] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const windowHeight = window.innerHeight;
            const totalHeight = document.documentElement.scrollHeight;

            setShowScrollToTop(scrollPosition > 100);

            setIsAtBottom(scrollPosition + windowHeight >= totalHeight);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const scrollToBottom = () => {
        window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" });
    };

    return (
        <div className="scroll-buttons">
            {showScrollToTop && (
                <Button
                    onClick={scrollToTop}
                    className="scroll-to-top-button"
                    title="scroll-to-top" aria-label="scroll-to-top"
                    style={{
                        position: "fixed",
                        bottom: "80px",
                        right: "20px",
                        backgroundColor: "transparent",
                        border: "none",
                    }}
                >
                    <FaChevronUp size={30} color="#c88f57" />
                </Button>
            )}

            {/* Nút Scroll to Bottom */}
            {!isAtBottom && (
                <Button
                    onClick={scrollToBottom}
                    className="scroll-to-bottom-button"
                    title="scroll-to-bottom" aria-label="scroll-to-bottom"
                    style={{
                        position: "fixed",
                        bottom: "20px",
                        right: "20px",
                        backgroundColor: "transparent",
                        border: "none",
                    }}
                >
                    <FaChevronDown size={30} color="#c88f57" />
                </Button>
            )}
        </div>
    );
};

export default ScrollButtons;
