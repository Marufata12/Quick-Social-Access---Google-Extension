const socialMediaPlatforms = {
    'Reddit': 'https://www.reddit.com/',
    'YouTube': 'https://www.youtube.com/',
    'Snapchat': 'https://www.snapchat.com/',
    'Instagram': 'https://www.instagram.com/direct/inbox/',
    'TikTok': 'https://www.tiktok.com/',
    'Kick': 'https://kick.com/',
    'Twitch': 'https://www.twitch.tv/',
    'Facebook': 'https://www.facebook.com/',
    'Twitter': 'https://twitter.com/',
    'LinkedIn': 'https://www.linkedin.com/',
    'Pinterest': 'https://www.pinterest.com/',
    'Tumblr': 'https://www.tumblr.com/',
    'WhatsApp': 'https://www.whatsapp.com/',
    'Telegram': 'https://telegram.org/',
    'WeChat': 'https://www.wechat.com/',
    'Viber': 'https://www.viber.com/',
    'Discord': 'https://discord.com/',
    'Clubhouse': 'https://www.joinclubhouse.com/',
    'Flickr': 'https://www.flickr.com/',
    'VK': 'https://vk.com/',
    'Meetup': 'https://www.meetup.com/',
    'Quora': 'https://www.quora.com/',
    'Goodreads': 'https://www.goodreads.com/',
    'Dailymotion': 'https://www.dailymotion.com/',
    'Mix': 'https://mix.com/',
    'Xing': 'https://www.xing.com/',
    'MySpace': 'https://myspace.com/',
    'Foursquare': 'https://foursquare.com/',
    'Steemit': 'https://steemit.com/',
    'Rumble': 'https://rumble.com/'
};

const socialMediaColors = {
    'Reddit': '#FF4500',
    'YouTube': '#FF0000',
    'Snapchat': '#FFFC00',
    'Instagram': '#C13584',
    'TikTok': '#000000',
    'Kick': '#52B020',
    'Twitch': '#6441A5',
    'Facebook': '#1877F2',
    'Twitter': '#1DA1F2',
    'LinkedIn': '#0077B5',
    'Pinterest': '#E60023',
    'Tumblr': '#35465C',
    'WhatsApp': '#25D366',
    'Telegram': '#0088CC',
    'WeChat': '#07C160',
    'Viber': '#662D91',
    'Discord': '#7289DA',
    'Clubhouse': '#FFC107',
    'Flickr': '#FF0084',
    'VK': '#45668E',
    'Meetup': '#F56040',
    'Quora': '#A82400',
    'Goodreads': '#372213',
    'Dailymotion': '#009CD6',
    'Mix': '#F3A900',
    'Xing': '#006567',
    'MySpace': '#003D5B',
    'Foursquare': '#F94877',
    'Steemit': '#3ABAB4',
    'Rumble': '#FF7F00'
};

function createButton(name, url, isRemovable) {
    const container = document.createElement('div');
    container.style.marginBottom = '10px';  
    container.style.position = 'relative';  

    const button = document.createElement('button');
    button.className = 'social-media-button';
    button.textContent = name;
    button.style.backgroundColor = socialMediaColors[name];  
    button.style.color = '#fff';  
    button.style.border = 'none';  
    button.style.padding = '10px 15px';  
    button.style.borderRadius = '5px';  
    button.onclick = () => {
        chrome.windows.create({
            url: url,
            type: 'popup',
            width: 450,
            height: 1000,
            top: 100,
            left: screen.availWidth - 375 - 20
        });
    };

    container.appendChild(button);

    if (isRemovable) {
        const removeIcon = document.createElement('button');
        removeIcon.className = 'remove-icon';
        removeIcon.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white">
                <path d="M6 18L18 6M6 6l12 12"/>
            </svg>
        `;
        removeIcon.style.position = 'absolute';
        removeIcon.style.right = '10px';  
        removeIcon.style.top = '50%';  
        removeIcon.style.transform = 'translateY(-50%)';  
        removeIcon.style.background = '#dc3545';  
        removeIcon.style.border = 'none';  
        removeIcon.style.cursor = 'pointer';  
        removeIcon.style.zIndex = '10';  

        removeIcon.onclick = (event) => {
            event.stopPropagation();
            chrome.storage.sync.get('selectedPlatforms', (data) => {
                const selectedPlatforms = data.selectedPlatforms || [];
                const updatedPlatforms = selectedPlatforms.filter(platform => platform !== name);
                chrome.storage.sync.set({ selectedPlatforms: updatedPlatforms }, loadButtons);
            });
        };
        container.appendChild(removeIcon);  
    }

    return container;
}


function loadButtons() {
    const container = document.getElementById('socialMediaButtons');
    container.innerHTML = '';

    chrome.storage.sync.get('selectedPlatforms', (data) => {
        const selectedPlatforms = data.selectedPlatforms || [];
        selectedPlatforms.forEach(platform => {
            if (socialMediaPlatforms[platform]) {
                const button = createButton(platform, socialMediaPlatforms[platform], true);
                container.appendChild(button);
            }
        });

        document.getElementById('addSocialMedia').style.display = 'block';
        document.getElementById('backToList').style.display = 'none';
    });
}

function showAddSocialMediaMenu() {
    const container = document.getElementById('socialMediaButtons');
    container.innerHTML = '';

    Object.keys(socialMediaPlatforms).forEach(platform => {
        const button = document.createElement('button');
        button.className = 'social-media-button';
        button.textContent = `Add ${platform}`;
        button.style.backgroundColor = socialMediaColors[platform];  
        button.style.color = '#fff';
        button.style.border = 'none';
        button.style.padding = '10px 15px';
        button.style.borderRadius = '5px';

        button.onclick = () => {
            chrome.storage.sync.get('selectedPlatforms', (data) => {
                const selectedPlatforms = data.selectedPlatforms || [];
                if (!selectedPlatforms.includes(platform)) {
                    selectedPlatforms.push(platform);
                    chrome.storage.sync.set({ selectedPlatforms: selectedPlatforms }, loadButtons);
                } else {
                    alert('Platform already added.');
                }
            });
        };
        container.appendChild(button);
    });

    document.getElementById('addSocialMedia').style.display = 'none';
    document.getElementById('backToList').style.display = 'block';
}

document.getElementById('addSocialMedia').addEventListener('click', showAddSocialMediaMenu);
document.getElementById('backToList').addEventListener('click', loadButtons);

document.addEventListener('DOMContentLoaded', loadButtons);
