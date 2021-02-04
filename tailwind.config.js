module.exports = {
    purge: [],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                gold: '#ffd700',
                'gold-comp': '#0028ff',
                royal: '#7851a9',
                'royal-comp': '#87ae56'
            }
        }
    },
    variants: {
        extend: {
            animation: ['hover', 'focus']
        }
    },
    plugins: []
};
