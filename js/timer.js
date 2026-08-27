const timer = {
    duration: 60,
    remaining: 60,
    interval: null,
    onTick: null,
    onTimeout: null,
    
    start(durationSeconds, tickCallback, timeoutCallback) {
        this.stop();
        this.duration = durationSeconds;
        this.remaining = durationSeconds;
        this.onTick = tickCallback;
        this.onTimeout = timeoutCallback;
        
        // Initial tick
        if (this.onTick) {
            this.onTick(this.remaining);
        }
        
        this.interval = setInterval(() => {
            this.remaining--;
            
            if (this.onTick) {
                this.onTick(this.remaining);
            }
            
            if (this.remaining <= 0) {
                this.stop();
                if (this.onTimeout) {
                    this.onTimeout();
                }
            }
        }, 1000);
    },
    
    stop() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    },
    
    reset() {
        this.stop();
        this.remaining = this.duration;
    }
};
