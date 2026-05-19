import React, { useEffect, useRef, useState } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";

// ---------- Theory Calculation Helpers ----------
// Projectile motion theory (range, max height, flight time)
function calcProjectileTheory(velocity, angleDeg, gravity) {
    const rad = (angleDeg * Math.PI) / 180;
    const vX = velocity * Math.cos(rad);
    const vY = velocity * Math.sin(rad);
    const flightTime = (2 * vY) / gravity; // seconds (scaled by animation step later)
    const range = vX * flightTime;
    const maxHeight = (vY * vY) / (2 * gravity);
    return { range, maxHeight, flightTime };
}

// Ideal gas theory: PV = nRT (n = 1 mole)
function calcGasTheory(temperature, volume) {
    const R = 8.314; // J·mol⁻¹·K⁻¹
    const n = 1; // mol
    const pressure = (n * R * temperature) / (volume / 10); // convert volume to m³ (approx)
    return { pressure };
}

export default function PhysicsLab() {

    const canvasRef = useRef(null);

    const [running, setRunning] = useState(true);
    const [experiment, setExperiment] = useState("projectile");

    const [velocity, setVelocity] = useState(50);
    const [angle, setAngle] = useState(45);
    const [gravity, setGravity] = useState(9.8);

    const [temperature, setTemperature] = useState(300);
    const [volume, setVolume] = useState(60);

    // Theory & result comparison state
    const [theory, setTheory] = useState({});
    const [actualRange, setActualRange] = useState(null);
    const [errorPercent, setErrorPercent] = useState(null);
    const [gasPressure, setGasPressure] = useState(null);

    // Compute theory values whenever parameters change
    useEffect(() => {
        if (experiment === "projectile") {
            const th = calcProjectileTheory(velocity, angle, gravity);
            setTheory(th);
            setActualRange(null);
            setErrorPercent(null);
        } else if (experiment === "gas") {
            const tg = calcGasTheory(temperature, volume);
            setGasPressure(tg.pressure);
            setTheory({});
            setActualRange(null);
            setErrorPercent(null);
        }
    }, [experiment, velocity, angle, gravity, temperature, volume]);


    const particlesRef = useRef([]);
    const projectileRef = useRef(null);

    useEffect(() => {

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        canvas.width = 1000;
        canvas.height = 650;

        initialize();

        let animation;

        function initialize() {

            if (experiment === "gas") {

                particlesRef.current = [];

                for (let i = 0; i < 70; i++) {

                    particlesRef.current.push({
                        x: Math.random() * 220 + 380,
                        y: Math.random() * 250 + 250,
                        vx: (Math.random() - 0.5) * 3,
                        vy: (Math.random() - 0.5) * 3,
                        r: 6
                    });

                }

            }

            if (experiment === "projectile") {

                const rad = angle * Math.PI / 180;

                projectileRef.current = {
                    x: 80,
                    y: 520,
                    vx: velocity * Math.cos(rad),
                    vy: -velocity * Math.sin(rad),
                    r: 16
                };

            }

        }

        function drawBackground() {

            const gradient = ctx.createLinearGradient(0, 0, 0, 650);

            gradient.addColorStop(0, "#dbeafe");
            gradient.addColorStop(1, "#ffffff");

            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

        }

        function drawGround() {

            ctx.fillStyle = "#22c55e";
            ctx.fillRect(0, 560, canvas.width, 100);

        }

        function updateProjectile() {

            const ball = projectileRef.current;

            ball.x += ball.vx * 0.1;

            ball.vy += gravity * 0.1;

            ball.y += ball.vy * 0.1;

            if (ball.y > 545) {

                ball.y = 545;
                ball.vy *= -0.7;

                // Capture actual range when projectile lands
                if (experiment === "projectile" && actualRange === null) {
                    setActualRange(ball.x);
                    // compute error percent if theory available
                    if (theory.range) {
                        const err = Math.abs(ball.x - theory.range) / theory.range * 100;
                        setErrorPercent(err);
                    }
                }
            }

        }

        function drawProjectile() {

            const ball = projectileRef.current;

            ctx.beginPath();
            ctx.fillStyle = "#2563eb";
            ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
            ctx.fill();

        }

        function drawGasContainer() {

            const h = volume * 4;

            const topY = 560 - h;

            ctx.fillStyle = "rgba(255,255,255,0.3)";
            ctx.strokeStyle = "#94a3b8";
            ctx.lineWidth = 4;

            ctx.beginPath();
            ctx.roundRect(350, topY, 300, h, 25);

            ctx.fill();
            ctx.stroke();

        }

        function updateGasParticles() {

            const h = volume * 4;
            const topY = 560 - h;

            particlesRef.current.forEach(p => {

                p.x += p.vx * temperature / 250;
                p.y += p.vy * temperature / 250;

                if (p.x < 365 || p.x > 635) {
                    p.vx *= -1;
                }

                if (p.y < topY + 10 || p.y > 545) {
                    p.vy *= -1;
                }

            });

        }

        function drawGasParticles() {

            particlesRef.current.forEach(p => {

                ctx.beginPath();

                ctx.fillStyle = "rgba(59,130,246,0.85)";

                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);

                ctx.fill();

            });

        }

        function render() {

            drawBackground();

            drawGround();

            if (running) {

                if (experiment === "projectile") {
                    updateProjectile();
                }

                if (experiment === "gas") {
                    updateGasParticles();
                }

            }

            if (experiment === "projectile") {
                drawProjectile();
            }

            if (experiment === "gas") {

                drawGasContainer();

                drawGasParticles();

            }

            animation = requestAnimationFrame(render);

        }

        render();

        return () => cancelAnimationFrame(animation);

    }, [
        experiment,
        running,
        velocity,
        angle,
        gravity,
        temperature,
        volume
    ]);

    function resetSimulation() {

        if (experiment === "projectile") {

            const rad = angle * Math.PI / 180;

            projectileRef.current = {
                x: 80,
                y: 520,
                vx: velocity * Math.cos(rad),
                vy: -velocity * Math.sin(rad),
                r: 16
            };

        }

    }

    function getEquation() {

        if (experiment === "projectile") {
            return "y = x tanθ − gx² / 2v²cos²θ";
        }

        if (experiment === "gas") {
            return "PV = nRT";
        }

        return "";

    }

    return (

        <div className="w-full h-screen flex bg-slate-100">

            {/* Sidebar */}

            <div className="w-[280px] bg-slate-900 text-white p-6 flex flex-col gap-4 shadow-2xl">

                <h1 className="text-3xl font-bold mb-6">
                    Physics Lab
                </h1>

                <button
                    onClick={() => setExperiment("projectile")}
                    className="bg-slate-800 hover:bg-blue-600 transition rounded-xl p-4 text-left"
                >
                    Projectile Motion
                </button>

                <button
                    onClick={() => setExperiment("gas")}
                    className="bg-slate-800 hover:bg-blue-600 transition rounded-xl p-4 text-left"
                >
                    Ideal Gas
                </button>

            </div>

            {/* Main */}

            <div className="flex-1 flex flex-col">

                {/* Top */}

                <div className="h-[80px] bg-white shadow flex items-center px-10">

                    <h2 className="text-3xl font-semibold">

                        {experiment === "projectile"
                            ? "Projectile Motion"
                            : "Ideal Gas Experiment"}

                    </h2>

                </div>

                {/* Content */}

                <div className="flex flex-1">

                    {/* Controls */}
                    <div className="theory-box" id="theoryBox">
                        {experiment === "projectile" && (
                            <>
                                <div className="theory-section-title">📐 Công thức lý thuyết</div>
                                <div className="theory-formula-block">
                                    <div className="theory-formula-row">
                                        <span className="theory-formula-label">Tầm xa</span>
                                        <span className="theory-formula-expr">R = v₀² · sin(2θ) / g</span>
                                    </div>
                                    <div className="theory-formula-row">
                                        <span className="theory-formula-label">Độ cao max</span>
                                        <span className="theory-formula-expr">H = v₀² · sin²θ / (2g)</span>
                                    </div>
                                    <div className="theory-formula-row">
                                        <span className="theory-formula-label">Thời gian bay</span>
                                        <span className="theory-formula-expr">T = 2v₀ · sinθ / g</span>
                                    </div>
                                </div>

                                <div className="theory-section-title">📊 Giá trị lý thuyết</div>
                                <div className="theory-result-grid">
                                    <div className="theory-result-item">
                                        <span className="theory-result-label">Tầm xa R</span>
                                        <span className="theory-result-value">{theory.range?.toFixed(2)} <span className="theory-unit">m</span></span>
                                    </div>
                                    <div className="theory-result-item">
                                        <span className="theory-result-label">Độ cao H</span>
                                        <span className="theory-result-value">{theory.maxHeight?.toFixed(2)} <span className="theory-unit">m</span></span>
                                    </div>
                                    <div className="theory-result-item">
                                        <span className="theory-result-label">Thời gian T</span>
                                        <span className="theory-result-value">{theory.flightTime?.toFixed(2)} <span className="theory-unit">s</span></span>
                                    </div>
                                </div>

                                <div className="theory-section-title">🎯 Kết quả thực tế</div>
                                <div className="theory-result-grid">
                                    <div className="theory-result-item">
                                        <span className="theory-result-label">Tầm xa đo được</span>
                                        <span className="theory-result-value">
                                            {actualRange !== null
                                                ? <>{actualRange.toFixed(2)} <span className="theory-unit">m</span></>
                                                : <span className="theory-pending">Đang chờ…</span>}
                                        </span>
                                    </div>
                                </div>
                                {errorPercent !== null && (
                                    <div className={`theory-error-badge ${errorPercent < 5 ? "good-match" : "bad-match"}`}>
                                        {errorPercent < 5 ? "✅" : "⚠️"} Sai lệch: {errorPercent.toFixed(1)} %
                                        <span className="theory-verdict">{errorPercent < 5 ? " — Khớp tốt!" : " — Sai lệch lớn"}</span>
                                    </div>
                                )}
                            </>
                        )}
                        {experiment === "gas" && (
                            <>
                                <div className="theory-section-title">📐 Công thức lý thuyết</div>
                                <div className="theory-formula-block">
                                    <div className="theory-formula-row">
                                        <span className="theory-formula-label">Phương trình</span>
                                        <span className="theory-formula-expr">PV = nRT</span>
                                    </div>
                                    <div className="theory-formula-row">
                                        <span className="theory-formula-label">Suy ra</span>
                                        <span className="theory-formula-expr">P = nRT / V</span>
                                    </div>
                                </div>
                                <div className="theory-section-title">📊 Kết quả tính toán</div>
                                <div className="theory-result-grid">
                                    <div className="theory-result-item">
                                        <span className="theory-result-label">Áp suất P</span>
                                        <span className="theory-result-value">{gasPressure?.toFixed(1)} <span className="theory-unit">Pa</span></span>
                                    </div>
                                    <div className="theory-result-item">
                                        <span className="theory-result-label">Hằng số R</span>
                                        <span className="theory-result-value">8.314 <span className="theory-unit">J/mol·K</span></span>
                                    </div>
                                    <div className="theory-result-item">
                                        <span className="theory-result-label">Số mol n</span>
                                        <span className="theory-result-value">1 <span className="theory-unit">mol</span></span>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>


                    <div className="w-[360px] bg-white border-r p-8 overflow-y-auto">

                        <div className="text-center text-4xl italic mb-10">

                            {getEquation()}

                        </div>

                        {experiment === "projectile" && (

                            <div className="space-y-8">

                                <div>

                                    <label className="font-semibold">
                                        Velocity: {velocity}
                                    </label>

                                    <input
                                        type="range"
                                        min="10"
                                        max="100"
                                        value={velocity}
                                        onChange={(e) =>
                                            setVelocity(Number(e.target.value))
                                        }
                                        className="w-full"
                                    />

                                </div>

                                <div>

                                    <label className="font-semibold">
                                        Angle: {angle}°
                                    </label>

                                    <input
                                        type="range"
                                        min="10"
                                        max="80"
                                        value={angle}
                                        onChange={(e) =>
                                            setAngle(Number(e.target.value))
                                        }
                                        className="w-full"
                                    />

                                </div>

                                <div>

                                    <label className="font-semibold">
                                        Gravity: {gravity}
                                    </label>

                                    <input
                                        type="range"
                                        min="1"
                                        max="20"
                                        step="0.1"
                                        value={gravity}
                                        onChange={(e) =>
                                            setGravity(Number(e.target.value))
                                        }
                                        className="w-full"
                                    />

                                </div>

                            </div>

                        )}

                        {experiment === "gas" && (

                            <div className="space-y-8">

                                <div>

                                    <label className="font-semibold">
                                        Temperature: {temperature} K
                                    </label>

                                    <input
                                        type="range"
                                        min="100"
                                        max="600"
                                        value={temperature}
                                        onChange={(e) =>
                                            setTemperature(Number(e.target.value))
                                        }
                                        className="w-full"
                                    />

                                </div>

                                <div>

                                    <label className="font-semibold">
                                        Volume: {volume}
                                    </label>

                                    <input
                                        type="range"
                                        min="30"
                                        max="80"
                                        value={volume}
                                        onChange={(e) =>
                                            setVolume(Number(e.target.value))
                                        }
                                        className="w-full"
                                    />

                                </div>

                            </div>

                        )}

                        {/* Buttons */}

                        <div className="flex gap-4 mt-12">

                            <button
                                onClick={() => setRunning(!running)}
                                className="flex-1 bg-blue-600 hover:bg-blue-700 transition text-white p-4 rounded-2xl flex items-center justify-center gap-2"
                            >

                                {running ? <Pause size={20} /> : <Play size={20} />}

                                {running ? "Pause" : "Resume"}

                            </button>

                            <button
                                onClick={resetSimulation}
                                className="flex-1 bg-slate-200 hover:bg-slate-300 transition p-4 rounded-2xl flex items-center justify-center gap-2"
                            >

                                <RotateCcw size={20} />

                                Reset

                            </button>

                        </div>

                    </div>

                    {/* Simulation */}

                    <div className="flex-1 flex items-center justify-center relative">

                        <canvas
                            ref={canvasRef}
                            className="rounded-3xl shadow-2xl bg-white"
                        />

                    </div>

                </div>

            </div>

        </div>

    );

}