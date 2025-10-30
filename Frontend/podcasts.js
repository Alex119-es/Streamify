// Streamify Podcasts - Interactive functionality
class PodcastsApp {
    constructor() {
        this.currentEpisode = {
            podcast: 'Tech Talks Daily',
            title: 'Ep. 156: "El futuro de la IA"',
            cover: 'https://images.unsplash.com/photo-1478737270239-2f02f77fc618?w=60&h=60&fit=crop',
            duration: 2712, // 45:12 in seconds
            currentTime: 1772 // 29:32 in seconds
        };
        
        this.isPlaying = false;
        this.isShuffled = false;
        this.isRepeating = false;
        this.volume = 0.7;
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.updatePlayerDisplay();
        this.startProgressUpdate();
    }
    
    setupEventListeners() {
        // Play/Pause button
        const playPauseBtn = document.querySelector('.control-btn.play-pause');
        playPauseBtn.addEventListener('click', () => this.togglePlayPause());
        
        // Shuffle button
        const shuffleBtn = document.querySelector('.control-btn.shuffle');
        shuffleBtn.addEventListener('click', () => this.toggleShuffle());
        
        // Repeat button
        const repeatBtn = document.querySelector('.control-btn.repeat');
        repeatBtn.addEventListener('click', () => this.toggleRepeat());
        
        // Previous button
        const prevBtn = document.querySelector('.control-btn.prev');
        prevBtn.addEventListener('click', () => this.previousEpisode());
        
        // Next button
        const nextBtn = document.querySelector('.control-btn.next');
        nextBtn.addEventListener('click', () => this.nextEpisode());
        
        // Like button
        const likeBtn = document.querySelector('.like-button');
        likeBtn.addEventListener('click', () => this.toggleLike());
        
        // Podcast cards
        const podcastCards = document.querySelectorAll('.podcast-card');
        podcastCards.forEach(card => {
            card.addEventListener('click', () => this.playEpisode(card));
        });
        
        // Category cards
        const categoryCards = document.querySelectorAll('.category-card');
        categoryCards.forEach(card => {
            card.addEventListener('click', () => this.showCategory(card));
        });
        
        // Progress bar interaction
        const progressBar = document.querySelector('.progress-bar');
        progressBar.addEventListener('click', (e) => this.seekEpisode(e));
        
        // Volume slider
        const volumeBar = document.querySelector('.volume-bar');
        volumeBar.addEventListener('click', (e) => this.setVolume(e));
        
        // Navigation arrows
        const navArrows = document.querySelectorAll('.nav-arrow');
        navArrows.forEach(arrow => {
            arrow.addEventListener('click', () => this.showComingSoon());
        });
        
        // Navigation items
        const navItems = document.querySelectorAll('.nav-item:not(.active)');
        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleNavigation(item);
            });
        });
        
        // User menu
        const userButton = document.querySelector('.user-button');
        userButton.addEventListener('click', () => this.showUserMenu());
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
    }
    
    togglePlayPause() {
        this.isPlaying = !this.isPlaying;
        this.updatePlayPauseButton();
        
        if (this.isPlaying) {
            this.startProgressUpdate();
        } else {
            this.stopProgressUpdate();
        }
        
        this.showNotification(this.isPlaying ? 'Reproduciendo' : 'Pausado');
    }
    
    updatePlayPauseButton() {
        const playPauseBtn = document.querySelector('.control-btn.play-pause');
        const svg = playPauseBtn.querySelector('svg');
        
        if (this.isPlaying) {
            // Pause icon
            svg.innerHTML = '<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>';
        } else {
            // Play icon
            svg.innerHTML = '<path d="M8 5v14l11-7z"/>';
        }
    }
    
    toggleShuffle() {
        this.isShuffled = !this.isShuffled;
        const shuffleBtn = document.querySelector('.control-btn.shuffle');
        
        if (this.isShuffled) {
            shuffleBtn.style.color = 'var(--accent)';
        } else {
            shuffleBtn.style.color = 'var(--text-secondary)';
        }
        
        this.showNotification(this.isShuffled ? 'Modo aleatorio activado' : 'Modo aleatorio desactivado');
    }
    
    toggleRepeat() {
        this.isRepeating = !this.isRepeating;
        const repeatBtn = document.querySelector('.control-btn.repeat');
        
        if (this.isRepeating) {
            repeatBtn.style.color = 'var(--accent)';
        } else {
            repeatBtn.style.color = 'var(--text-secondary)';
        }
        
        this.showNotification(this.isRepeating ? 'Repetición activada' : 'Repetición desactivada');
    }
    
    previousEpisode() {
        this.showNotification('Episodio anterior');
        this.simulateEpisodeChange();
    }
    
    nextEpisode() {
        this.showNotification('Siguiente episodio');
        this.simulateEpisodeChange();
    }
    
    toggleLike() {
        const likeBtn = document.querySelector('.like-button');
        const isLiked = likeBtn.style.color === 'var(--accent)';
        
        if (isLiked) {
            likeBtn.style.color = 'var(--text-secondary)';
            this.showNotification('Eliminado de favoritos');
        } else {
            likeBtn.style.color = 'var(--accent)';
            this.showNotification('Agregado a favoritos');
        }
        
        // Add animation
        likeBtn.style.transform = 'scale(1.2)';
        setTimeout(() => {
            likeBtn.style.transform = 'scale(1)';
        }, 150);
    }
    
    playEpisode(card) {
        const title = card.querySelector('.card-title').textContent;
        const artist = card.querySelector('.card-artist').textContent;
        const cover = card.querySelector('.card-image img').src;
        
        this.currentEpisode = {
            podcast: title,
            title: artist.split(' • ')[0], // Get episode info
            cover,
            duration: Math.floor(Math.random() * 3600) + 1800, // 30-80 minutes
            currentTime: Math.floor(Math.random() * 1800) // Random progress
        };
        
        this.isPlaying = true;
        this.updatePlayerDisplay();
        this.updatePlayPauseButton();
        this.showNotification(`Reproduciendo: ${title}`);
        
        // Add visual feedback
        card.style.transform = 'scale(0.95)';
        setTimeout(() => {
            card.style.transform = 'scale(1)';
        }, 150);
    }
    
    showCategory(card) {
        const categoryName = card.querySelector('h3').textContent;
        this.showNotification(`Explorando: ${categoryName}`);
        
        // Add visual feedback
        card.style.transform = 'scale(0.95)';
        setTimeout(() => {
            card.style.transform = 'scale(1)';
        }, 150);
    }
    
    seekEpisode(e) {
        const progressBar = e.currentTarget;
        const rect = progressBar.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const percentage = clickX / rect.width;
        
        this.currentEpisode.currentTime = Math.floor(this.currentEpisode.duration * percentage);
        this.updateProgressDisplay();
        
        this.showNotification('Cambio de posición');
    }
    
    setVolume(e) {
        const volumeBar = e.currentTarget;
        const rect = volumeBar.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        this.volume = Math.max(0, Math.min(1, clickX / rect.width));
        
        const volumeFill = volumeBar.querySelector('.volume-fill');
        volumeFill.style.width = `${this.volume * 100}%`;
        
        this.showNotification(`Volumen: ${Math.round(this.volume * 100)}%`);
    }
    
    updatePlayerDisplay() {
        const songName = document.querySelector('.song-name');
        const artistName = document.querySelector('.artist-name');
        const nowPlayingImg = document.querySelector('.now-playing-img');
        
        songName.textContent = this.currentEpisode.podcast;
        artistName.textContent = this.currentEpisode.title;
        nowPlayingImg.src = this.currentEpisode.cover;
        
        this.updateProgressDisplay();
    }
    
    updateProgressDisplay() {
        const progressFill = document.querySelector('.progress-fill');
        const timeCurrent = document.querySelector('.time-current');
        const timeTotal = document.querySelector('.time-total');
        
        const percentage = (this.currentEpisode.currentTime / this.currentEpisode.duration) * 100;
        progressFill.style.width = `${percentage}%`;
        
        timeCurrent.textContent = this.formatTime(this.currentEpisode.currentTime);
        timeTotal.textContent = this.formatTime(this.currentEpisode.duration);
    }
    
    startProgressUpdate() {
        if (this.progressInterval) return;
        
        this.progressInterval = setInterval(() => {
            if (this.isPlaying && this.currentEpisode.currentTime < this.currentEpisode.duration) {
                this.currentEpisode.currentTime++;
                this.updateProgressDisplay();
            } else if (this.currentEpisode.currentTime >= this.currentEpisode.duration) {
                this.nextEpisode();
            }
        }, 1000);
    }
    
    stopProgressUpdate() {
        if (this.progressInterval) {
            clearInterval(this.progressInterval);
            this.progressInterval = null;
        }
    }
    
    simulateEpisodeChange() {
        this.currentEpisode.currentTime = 0;
        const episodes = [
            { podcast: 'Tech Talks Daily', title: 'Ep. 157: "Nuevas Tecnologías"' },
            { podcast: 'Business Minds', title: 'Ep. 90: "Marketing Digital"' },
            { podcast: 'Comedy Central Pod', title: 'Ep. 343: "Comediantes Invitados"' },
            { podcast: 'Science Explained', title: 'Ep. 68: "Universo y Cosmos"' },
            { podcast: 'History Chronicles', title: 'Ep. 204: "Civilizaciones Antiguas"' }
        ];
        
        const randomEpisode = episodes[Math.floor(Math.random() * episodes.length)];
        this.currentEpisode.podcast = randomEpisode.podcast;
        this.currentEpisode.title = randomEpisode.title;
        this.currentEpisode.duration = Math.floor(Math.random() * 3600) + 1800;
        this.currentEpisode.currentTime = 0;
        
        this.updatePlayerDisplay();
    }
    
    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }
    
    showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--bg-elevated);
            color: var(--text-primary);
            padding: 12px 20px;
            border-radius: 8px;
            box-shadow: var(--shadow-lg);
            z-index: 1000;
            font-size: 14px;
            font-weight: 500;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Animate out and remove
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 2000);
    }
    
    showComingSoon() {
        this.showNotification('Próximamente...');
    }
    
    handleNavigation(item) {
        const href = item.getAttribute('href');
        if (href && href !== '#') {
            window.location.href = href;
        } else {
            this.showComingSoon();
        }
    }
    
    showUserMenu() {
        this.showNotification('Menú de usuario');
    }
    
    handleKeyboard(e) {
        switch (e.code) {
            case 'Space':
                e.preventDefault();
                this.togglePlayPause();
                break;
            case 'ArrowLeft':
                e.preventDefault();
                this.previousEpisode();
                break;
            case 'ArrowRight':
                e.preventDefault();
                this.nextEpisode();
                break;
            case 'ArrowUp':
                e.preventDefault();
                this.volume = Math.min(1, this.volume + 0.1);
                this.setVolumeFromValue();
                break;
            case 'ArrowDown':
                e.preventDefault();
                this.volume = Math.max(0, this.volume - 0.1);
                this.setVolumeFromValue();
                break;
        }
    }
    
    setVolumeFromValue() {
        const volumeFill = document.querySelector('.volume-fill');
        volumeFill.style.width = `${this.volume * 100}%`;
        this.showNotification(`Volumen: ${Math.round(this.volume * 100)}%`);
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PodcastsApp();
});

// Add smooth scrolling for better UX
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add loading animation for images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('load', function() {
        this.style.opacity = '0';
        this.style.transition = 'opacity 0.3s ease';
        setTimeout(() => {
            this.style.opacity = '1';
        }, 100);
    });
});