import { useEffect } from 'react';
import { useRouter } from 'next/router';

const SenjaEmbed: React.FC = () => {

    useEffect(() => {
        // Add the Senja platform script dynamically to the document head
        const script = document.createElement('script');
        script.src = 'https://static.senja.io/dist/platform.js';
        script.async = true;
        document.head.appendChild(script);

        // Clean up the script when the component is unmounted
        return () => {
            document.head.removeChild(script);
        };
    }, []);

    return <div className="senja-embed" data-id="59f7ce89-2e21-4a56-9d89-c52e80fcd462" data-mode="shadow" data-lazyload="false"></div>;
};

export default SenjaEmbed;
