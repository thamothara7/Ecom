import { useState, useRef } from 'react';
import { gsap } from 'gsap';

const AddToCartButton = () => {
    const [isAdded, setIsAdded] = useState(false);
    const buttonRef = useRef(null);
    const textRef = useRef(null);

    const handleClick = () => {
        if (isAdded) return;

        const tl = gsap.timeline({
            onComplete: () => {
                setTimeout(() => {
                    setIsAdded(false);
                    gsap.to(buttonRef.current, { width: 'auto', backgroundColor: 'transparent', color: 'var(--text-color)', duration: 0.3 });
                    gsap.to(textRef.current, { opacity: 1, x: 0, duration: 0.3 });
                }, 2000);
            }
        });

        tl.to(buttonRef.current, { scale: 0.9, duration: 0.1 })
            .to(buttonRef.current, { scale: 1, width: '140px', backgroundColor: 'var(--accent-color)', color: '#000', duration: 0.3 })
            .to(textRef.current, { opacity: 0, duration: 0.1 }, '<')
            .call(() => setIsAdded(true))
            .fromTo(textRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.2 });
    };

    return (
        <button
            ref={buttonRef}
            className={`add-to-cart-btn ${isAdded ? 'added' : ''}`}
            onClick={handleClick}
        >
            <span ref={textRef} style={{ display: 'inline-block' }}>
                {isAdded ? 'Added! ✨' : 'Add to Cart'}
            </span>
        </button>
    );
};

export default AddToCartButton;
