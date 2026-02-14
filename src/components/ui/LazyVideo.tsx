import React, { useState, useEffect, useRef } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LazyVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
    src: string;
    poster?: string;
    containerClassName?: string;
}

const LazyVideo = React.forwardRef<HTMLVideoElement, LazyVideoProps>(({
    src,
    poster,
    className,
    containerClassName,
    ...props
}, ref) => {
    const internalRef = useRef<HTMLVideoElement>(null);
    const [isInView, setIsInView] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    // Use external ref if provided, otherwise internal ref
    const videoRef = (ref as React.MutableRefObject<HTMLVideoElement>) || internalRef;

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsInView(true);
                        observer.disconnect();
                    }
                });
            },
            {
                rootMargin: "200px", // Start loading before it comes into view
                threshold: 0.1,
            }
        );

        if (videoRef.current) {
            observer.observe(videoRef.current);
        }

        return () => {
            observer.disconnect();
        };
    }, [videoRef]);

    const handleLoadedData = () => {
        setIsLoaded(true);
    };

    return (
        <div className={cn("relative w-full h-full bg-muted/20", containerClassName)}>
            {!isLoaded && (
                <div className="absolute inset-0 flex items-center justify-center z-10">
                    <Loader2 className="w-8 h-8 animate-spin text-primary/50" />
                </div>
            )}

            <video
                ref={videoRef}
                src={isInView ? src : undefined}
                poster={poster}
                className={cn(
                    "w-full h-full object-cover transition-opacity duration-500",
                    isLoaded ? "opacity-100" : "opacity-0",
                    className
                )}
                onLoadedData={handleLoadedData}
                {...props}
            />
        </div>
    );
});

LazyVideo.displayName = "LazyVideo";

export default LazyVideo;
