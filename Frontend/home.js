// Streamify - Interactive functionality
class StreamifyApp {
    constructor() {
        this.currentSong = {
            title: 'Summer Vibes',
            artist: 'Various Artists',
            cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=60&h=60&fit=crop',
            duration: 272, // 4:32 in seconds
            currentTime: 135 // 2:15 in seconds
        };
        
        this.isPlaying = true;
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
        prevBtn.addEventListener('click', () => this.previousTrack());
        
        // Next button
        const nextBtn = document.querySelector('.control-btn.next');
        nextBtn.addEventListener('click', () => this.nextTrack());
        
        // Like button
        const likeBtn = document.querySelector('.like-button');
        likeBtn.addEventListener('click', () => this.toggleLike());
        
        // Music cards
        const musicCards = document.querySelectorAll('.music-card');
        musicCards.forEach(card => {
            card.addEventListener('click', () => this.playTrack(card));
        });
        
        // Quick access items
        const quickItems = document.querySelectorAll('.quick-item');
        quickItems.forEach(item => {
            item.addEventListener('click', () => this.playQuickAccess(item));
        });
        
        // Progress bar interaction
        const progressBar = document.querySelector('.progress-bar');
        progressBar.addEventListener('click', (e) => this.seekTrack(e));
        
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
    
    previousTrack() {
        this.showNotification('Anterior pista');
        this.simulateTrackChange();
    }
    
    nextTrack() {
        this.showNotification('Siguiente pista');
        this.simulateTrackChange();
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
    
    playTrack(card) {
        const title = card.querySelector('.card-title').textContent;
        const artist = card.querySelector('.card-artist').textContent;
        const cover = card.querySelector('.card-image img').src;
        
        this.currentSong = {
            title,
            artist,
            cover,
            duration: Math.floor(Math.random() * 300) + 180, // 3-8 minutes
            currentTime: 0
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
    
    playQuickAccess(item) {
        const title = item.querySelector('span').textContent;
        this.showNotification(`Reproduciendo: ${title}`);
        
        // Add visual feedback
        item.style.transform = 'scale(0.95)';
        setTimeout(() => {
            item.style.transform = 'scale(1)';
        }, 150);
    }
    
    seekTrack(e) {
        const progressBar = e.currentTarget;
        const rect = progressBar.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const percentage = clickX / rect.width;
        
        this.currentSong.currentTime = Math.floor(this.currentSong.duration * percentage);
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
        
        songName.textContent = this.currentSong.title;
        artistName.textContent = this.currentSong.artist;
        nowPlayingImg.src = this.currentSong.cover;
        
        this.updateProgressDisplay();
    }
    
    updateProgressDisplay() {
        const progressFill = document.querySelector('.progress-fill');
        const timeCurrent = document.querySelector('.time-current');
        const timeTotal = document.querySelector('.time-total');
        
        const percentage = (this.currentSong.currentTime / this.currentSong.duration) * 100;
        progressFill.style.width = `${percentage}%`;
        
        timeCurrent.textContent = this.formatTime(this.currentSong.currentTime);
        timeTotal.textContent = this.formatTime(this.currentSong.duration);
    }
    
    startProgressUpdate() {
        if (this.progressInterval) return;
        
        this.progressInterval = setInterval(() => {
            if (this.isPlaying && this.currentSong.currentTime < this.currentSong.duration) {
                this.currentSong.currentTime++;
                this.updateProgressDisplay();
            } else if (this.currentSong.currentTime >= this.currentSong.duration) {
                this.nextTrack();
            }
        }, 1000);
    }
    
    stopProgressUpdate() {
        if (this.progressInterval) {
            clearInterval(this.progressInterval);
            this.progressInterval = null;
        }
    }
    
    simulateTrackChange() {
        this.currentSong.currentTime = 0;
        const tracks = [
            { title: 'Summer Vibes', artist: 'Various Artists' },
            { title: 'Electronic Dreams', artist: 'Digital Waves' },
            { title: 'Jazz Nights', artist: 'Smooth Collective' },
            { title: 'Acoustic Sessions', artist: 'Unplugged' },
            { title: 'Indie Rock', artist: 'Alternative Vibes' }
        ];
        
        const randomTrack = tracks[Math.floor(Math.random() * tracks.length)];
        this.currentSong.title = randomTrack.title;
        this.currentSong.artist = randomTrack.artist;
        this.currentSong.duration = Math.floor(Math.random() * 300) + 180;
        this.currentSong.currentTime = 0;
        
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
                this.previousTrack();
                break;
            case 'ArrowRight':
                e.preventDefault();
                this.nextTrack();
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
    new StreamifyApp();
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