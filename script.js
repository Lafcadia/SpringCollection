var touchedParticles = 0;

if (window.onload) {
    var oldOnload = window.onload;
    window.onload = function() {
        oldOnload();
        initializeScene();
    }
} else {
    window.onload = initializeScene;
}

function initializeScene() {
    // Create a scene
    var scene = document.querySelector('a-scene');
    // Function to create a particle
    function createParticle() {
        var particle = document.createElement('a-sphere');
        particle.setAttribute('radius', '0.1');
        particle.setAttribute('color', 'pink');
        particle.setAttribute('onclick', 'remove_the_particle(this);');
        particle.setAttribute('position', {
            x: (Math.random() - 0.5) * 100,
            y: (Math.random() - 0.5) * 10,
            z: (Math.random() - 0.5) * 100
        });
        scene.appendChild(particle);
    }

    // Generate particles every half second for a minute
    var particleInterval = setInterval(createParticle, 50); // Increased frequency
    setTimeout(function() {
        clearInterval(particleInterval);
        showFinalCount();
    }, 60000);

    // Function to show the final count of touched particles
    function showFinalCount() {
        var finalCount = document.createElement('a-text');
        finalCount.setAttribute('value', 'Game Over! Total Clicked Particles: ' + touchedParticles);
        finalCount.setAttribute('position', '0 3 -3');
        scene.appendChild(finalCount);
    }
}

function updateTouchedParticlesCount() {
    var counter = document.getElementById('touchedParticlesCount');
    if (!counter) {
        counter = document.createElement('a-text');
        counter.setAttribute('id', 'touchedParticlesCount');
        counter.setAttribute('position', '0 2 -3');
        scene.appendChild(counter);
    }
    counter.setAttribute('value', 'Clicked Particles: ' + touchedParticles);
}

function remove_the_particle(particle) {
    particle.parentNode.removeChild(particle);
    touchedParticles++;
    updateTouchedParticlesCount();
}