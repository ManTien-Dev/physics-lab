// ═══════════════════════════════════════════════════
// PHÒNG THÍ NGHIỆM VẬT LÝ ĐẠI CƯƠNG (PHYS 101)
// Thiết kế: SaaS Bento Grid Edition
// Tác giả: TIEN VAN MAN
// ═══════════════════════════════════════════════════

// ── Cấu hình thí nghiệm ──
const EXPERIMENTS = {
  projectile: {
    title: 'Ném xiên',
    subtitle: 'Nghiệm giải tích – quỹ đạo parabol chính xác',
    latex: 'y = x\\tan\\alpha - \\dfrac{gx^2}{2v_0^2\\cos^2\\alpha}',
    params: [
      { key: 'angle', label: 'α', unit: '°', min: 5, max: 85, step: 1, val: 45, color: '#F59E0B' },
      { key: 'v0', label: 'v₀', unit: 'm/s', min: 5, max: 60, step: 1, val: 30, color: '#6366F1' },
      { key: 'gravity', label: 'g', unit: 'm/s²', min: 1, max: 20, step: 0.1, val: 9.8, color: '#10B981' }
    ],
    theory: `<p>Chuyển động ném xiên là tổ hợp của chuyển động <b>thẳng đều</b> theo phương ngang và <b>rơi tự do</b> theo phương đứng.</p>
      <p class="formula-label">Phương trình chuyển động:</p>
      <div class="formula">$$x(t) = v_0 \\cos(\\alpha) t$$</div>
      <div class="formula">$$y(t) = v_0 \\sin(\\alpha) t - \\frac{1}{2}gt^2$$</div>
      <p class="formula-label">Tầm bay xa (R):</p>
      <div class="formula">$$R = \\frac{v_0^2 \\sin(2\\alpha)}{g}$$</div>
      <p class="formula-label">Độ cao cực đại (H):</p>
      <div class="formula">$$H = \\frac{v_0^2 \\sin^2(\\alpha)}{2g}$$</div>
      <p>Quỹ đạo chuyển động là một đường <b>parabol</b>. Tầm xa cực đại đạt được khi góc bắn $\\alpha = 45^\\circ$.</p>`
  },
  pendulum: {
    title: 'Con lắc đơn',
    subtitle: 'Tích phân Runge-Kutta bậc 4 (RK4) phi tuyến',
    latex: '\\ddot{\\theta} = -\\dfrac{g}{L}\\sin\\theta',
    params: [
      { key: 'length', label: 'L', unit: 'm', min: 0.2, max: 3, step: 0.1, val: 1.5, color: '#F59E0B' },
      { key: 'gravity', label: 'g', unit: 'm/s²', min: 1, max: 20, step: 0.1, val: 9.8, color: '#10B981' },
      { key: 'amplitude', label: 'θ₀', unit: '°', min: 5, max: 170, step: 1, val: 45, color: '#6366F1' }
    ],
    theory: `<p>Con lắc dao động với biên độ lớn tuân theo phương trình vi phân <b>phi tuyến</b>:</p>
      <div class="formula">$$\\ddot{\\theta} + \\frac{g}{L} \\sin(\\theta) = 0$$</div>
      <p class="formula-label">Chu kỳ dao động góc nhỏ (Tuyến tính):</p>
      <div class="formula">$$T_0 = 2\\pi \\sqrt{\\frac{L}{g}}$$</div>
      <p>Mô phỏng sử dụng phương pháp tích phân số **Runge-Kutta bậc 4** (RK4) giúp duy trì độ chính xác cao ngay cả ở biên độ cực đại.</p>
      <p class="formula-label">Bảo toàn năng lượng cơ học:</p>
      <div class="formula">$$E = E_k + E_t = \\frac{1}{2} m L^2 \\dot{\\theta}^2 + m g L (1 - \\cos\\theta) = \\text{const}$$</div>`
  },
  collision: {
    title: 'Va chạm đàn hồi',
    subtitle: 'Bảo toàn động lượng & bảo toàn động năng',
    latex: 'v_1\'=\\dfrac{m_1-m_2}{m_1+m_2}v_1 \\quad v_2\'=\\dfrac{2m_1}{m_1+m_2}v_1',
    params: [
      { key: 'm1', label: 'm₁', unit: 'kg', min: 0.5, max: 5, step: 0.1, val: 2.5, color: '#EF4444' },
      { key: 'm2', label: 'm₂', unit: 'kg', min: 0.5, max: 5, step: 0.1, val: 1.5, color: '#06B6D4' },
      { key: 'v1', label: 'v₁', unit: 'm/s', min: 1, max: 15, step: 0.5, val: 6.0, color: '#F59E0B' },
      { key: 'v2', label: 'v₂', unit: 'm/s', min: -10, max: 0, step: 0.5, val: 0.0, color: '#10B981' }
    ],
    theory: `<p>Va chạm đàn hồi hoàn toàn là quá trình tương tác bảo toàn cả <b>động lượng</b> và <b>động năng</b> của hệ hai vật.</p>
      <p class="formula-label">Định luật bảo toàn động lượng:</p>
      <div class="formula">$$m_1 v_1 + m_2 v_2 = m_1 v_1' + m_2 v_2'$$</div>
      <p class="formula-label">Định luật bảo toàn động năng:</p>
      <div class="formula">$$\\frac{1}{2}m_1 v_1^2 + \\frac{1}{2}m_2 v_2^2 = \\frac{1}{2}m_1 v_1'^2 + \\frac{1}{2}m_2 v_2'^2$$</div>
      <p>Khi hai vật cùng khối lượng ($m_1 = m_2$): chúng sẽ trao đổi hoàn toàn vận tốc cho nhau sau khi va chạm.</p>`
  },
  gas: {
    title: 'Khí lý tưởng',
    subtitle: 'Phân bố Maxwell-Boltzmann và va chạm phân tử',
    latex: 'PV = nRT \\quad v_{rms} = \\sqrt{\\dfrac{3RT}{M}}',
    params: [
      { key: 'gT', label: 'T', unit: 'K', min: 100, max: 800, step: 5, val: 300, color: '#EF4444' },
      { key: 'gV', label: 'V', unit: 'L', min: 8, max: 40, step: 1, val: 22, color: '#6366F1' },
      { key: 'gn', label: 'n', unit: 'mol', min: 0.5, max: 3, step: 0.1, val: 1.0, color: '#10B981' }
    ],
    theory: `<p class="formula-label">Phương trình trạng thái khí lý tưởng:</p>
      <div class="formula">$$PV = nRT$$</div>
      <p>Trong đó hằng số khí lý tưởng $R = 0.0821\\text{ atm}\\cdot\\text{L}/(\\text{mol}\\cdot\\text{K}) = 8.314\\text{ J}/(\\text{mol}\\cdot\\text{K})$.</p>
      <p class="formula-label">Tốc độ căn quân phương ($v_{\\text{rms}}$):</p>
      <div class="formula">$$v_{\\text{rms}} = \\sqrt{\\frac{3RT}{M}}$$</div>
      <p>Các hạt khí được khởi tạo vận tốc theo phân bố xác suất **Maxwell-Boltzmann**. Va chạm đàn hồi với thành bình tạo nên áp suất khí.</p>`
  },
  carnot: {
    title: 'Chu trình Carnot',
    subtitle: 'Đồ thị trạng thái P-V – Isotherms & Adiabats',
    latex: '\\eta_{Carnot} = 1 - \\dfrac{T_C}{T_H}',
    params: [
      { key: 'T1', label: 'T_H', unit: 'K', min: 300, max: 1200, step: 10, val: 650, color: '#EF4444' },
      { key: 'T2', label: 'T_C', unit: 'K', min: 100, max: 590, step: 10, val: 250, color: '#6366F1' }
    ],
    theory: `<p>Chu trình Carnot là chu trình nhiệt động lực học lý tưởng bao gồm <b>4 quá trình</b>:</p>
      <div class="theory-steps">
        <div class="theory-step"><span class="step-num">1→2</span> Giãn nở <b>đẳng nhiệt</b> ở $T_H$ (nhận nhiệt lượng $Q_H$)</div>
        <div class="theory-step"><span class="step-num">2→3</span> Giãn nở <b>đoạn nhiệt</b> ($PV^\\gamma = \\text{const}$)</div>
        <div class="theory-step"><span class="step-num">3→4</span> Nén <b>đẳng nhiệt</b> ở $T_C$ (thải nhiệt lượng $Q_C$)</div>
        <div class="theory-step"><span class="step-num">4→1</span> Nén <b>đạn nhiệt</b></div>
      </div>
      <p class="formula-label">Hiệu suất cực đại của động cơ nhiệt:</p>
      <div class="formula">$$\\eta = 1 - \\frac{T_C}{T_H}$$</div>
      <p>Đồ thị biểu diễn chính xác đường cong đẳng nhiệt (màu đỏ/xanh) và đoạn nhiệt (màu xám).</p>`
  }
};

// ── State Variables ──
let currentExp = 'projectile';
let running = true;
let animId = null;
let p = {};
let lastTs = null;
let simSpeed = 1;

let proj = {}, pend = {}, coll = {}, gasState = {}, carnotT = 0;
let vfxParticles = [];
let ambientParticles = [];
let trails = [];
let mouseX = -1000, mouseY = -1000;
let zoomLevel = 1.0;

// ── Colors (Deep Space Neon Palette) ──
const C = {
  bg: 'transparent',
  bg2: 'rgba(10, 13, 23, 0.65)',
  grid: 'rgba(255, 255, 255, 0.015)',
  ground: 'rgba(0, 240, 255, 0.02)',
  groundLine: 'rgba(0, 240, 255, 0.3)',
  text: '#FFFFFF',
  muted: '#8E9BB0',
  border: 'rgba(255, 255, 255, 0.05)',
  indigo: '#7C5CFC',
  indigoGlow: 'rgba(124, 92, 252, 0.3)',
  cyan: '#00F0FF',
  amber: '#FFEA00',
  mint: '#00FF66',
  rose: '#FF007F',
  purple: '#7C5CFC',
  pink: '#FF007F',
  sky: '#00F0FF',
  trail: 'rgba(0, 240, 255, 0.8)',
  trailFade: 'rgba(0, 240, 255, 0.05)'
};

// ── DOM References ──
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const eqBox = document.getElementById('equationBox');
const pList = document.getElementById('paramsList');
const sBox = document.getElementById('statsBox');
const tBox = document.getElementById('theoryBox');
const btnPause = document.getElementById('btnPause');
const btnReset = document.getElementById('btnReset');
const speedSl = document.getElementById('speedSlider');
const speedVal = document.getElementById('speedValue');

function resizeCanvas() {
  const container = canvas.parentElement;
  if (container) {
    const isZen = document.querySelector('.workspace').classList.contains('zen-mode');
    if (isZen) {
      container.style.zoom = "1.35"; // Phóng to 135% mọi thứ (bao gồm chữ, nét vẽ)
      zoomLevel = 1.35;
    } else {
      container.style.zoom = "1";
      zoomLevel = 1.0;
    }
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
  }
}

// ── MAIN RENDER LOOP ──
function render(time) {
  if (!lastTs) lastTs = time;
  const dt = Math.min((time - lastTs) / 1000, 0.1);
  lastTs = time;

  if (currentExp === 'projectile') drawProjectile(dt);
  else if (currentExp === 'pendulum') drawPendulum(dt);
  else if (currentExp === 'collision') drawCollision(dt);
  else if (currentExp === 'gas') drawGas(dt);
  else if (currentExp === 'carnot') drawCarnot(dt);

  updateAndDrawParticles();
  
  updateStats();
  updateVerification();

  animId = requestAnimationFrame(render);
}

// ── Speed Controls ──
speedSl.addEventListener('input', () => {
  simSpeed = +speedSl.value;
  speedVal.textContent = simSpeed.toFixed(1) + '×';
});

// ── LaTeX Clipboard copy logic ──
const btnCopyMath = document.getElementById('btnCopyMath');
const copyToast = document.getElementById('copyToast');
if (btnCopyMath && copyToast) {
  btnCopyMath.addEventListener('click', () => {
    const exp = EXPERIMENTS[currentExp];
    if (exp && exp.latex) {
      navigator.clipboard.writeText(exp.latex).then(() => {
        copyToast.classList.add('show');
        setTimeout(() => copyToast.classList.remove('show'), 2000);
      }).catch(err => console.error('Lỗi sao chép LaTeX:', err));
    }
  });
}

// ── UI Render ──
const expIcons = { projectile: '🎯', pendulum: '🕐', collision: '💥', gas: '🫧', carnot: '♨️' };
function renderUI() {
  const exp = EXPERIMENTS[currentExp];
  const icon = expIcons[currentExp] || '🔬';
  document.getElementById('expTitle').innerHTML = `<span class="title-icon">${icon}</span> <span class="gradient-text">${exp.title}</span>`;
  document.getElementById('expSubtitle').textContent = exp.subtitle;
  
  const monTitle = document.getElementById('monitorTitle');
  if (monTitle) monTitle.textContent = `SIMULATION // ${exp.title.toUpperCase()}`;
  
  katex.render(exp.latex, eqBox, { throwOnError: false, displayMode: true });
  
  // Set theory text HTML
  tBox.innerHTML = exp.theory || '';
  tBox.innerHTML += buildVerificationPanel();
  
  // Auto-render math in theory box using KaTeX
  if (typeof renderMathInElement === 'function') {
    renderMathInElement(tBox, {
      delimiters: [
        {left: '$$', right: '$$', display: true},
        {left: '$', right: '$', display: false}
      ],
      throwOnError: false
    });
  }

  pList.innerHTML = '';
  exp.params.forEach(pr => {
    p[pr.key] = p[pr.key] ?? pr.val;
    const row = document.createElement('div');
    row.className = 'param-row';
    row.innerHTML = `
      <div class="param-header">
        <span class="param-label" style="color:var(--text-main)">${pr.label}</span>
        <div>
          <span class="param-value" style="color:${pr.color}" id="val-${pr.key}">${(+p[pr.key]).toFixed(1)}</span>
          <span class="param-unit">${pr.unit}</span>
        </div>
      </div>
      <input type="range" id="sl-${pr.key}" min="${pr.min}" max="${pr.max}" step="${pr.step}" value="${p[pr.key]}" class="sleek-slider">
    `;
    pList.appendChild(row);

    // Apply accent colors dynamically to slider thumbs
    const sliderInput = row.querySelector(`#sl-${pr.key}`);
    sliderInput.style.accentColor = pr.color;

    sliderInput.addEventListener('input', e => {
      const oldT = p.gT;
      p[pr.key] = +e.target.value;
      row.querySelector(`#val-${pr.key}`).textContent = (+p[pr.key]).toFixed(1);
      if (currentExp === 'gas' && pr.key === 'gT' && gasState.particles) {
        const factor = Math.sqrt(p.gT / oldT);
        gasState.particles.forEach(pt => { pt.vx *= factor; pt.vy *= factor; });
      }
      if (currentExp === 'gas' && pr.key === 'gV') rebuildGasContainer();
      else if (currentExp !== 'gas') initPhysics();
      updateStats();
    });
  });
  updateStats();
}

function updateStats() {
  if (!sBox) return;
  // Cập nhật ảnh nền Vũ trụ riêng cho từng thí nghiệm
  const bgImageMap = {
    'projectile': "url('./projectile_bg.png')",
    'pendulum': "url('./pendulum_bg.png')",
    'collision': "url('./collision_bg.png')",
    'gas': "url('./gas_bg.jpg')",
    'carnot': "url('./carnot_bg.png')"
  };
  const canvasContainer = document.querySelector('.canvas-container');
  if (canvasContainer && bgImageMap[currentExp]) {
    canvasContainer.style.setProperty('--bg-image', bgImageMap[currentExp]);
  }
  const stats = getStats();
  sBox.innerHTML = '';
  stats.forEach(s => {
    const row = document.createElement('div');
    row.className = 'stat-row';
    row.innerHTML = `<span class="stat-label">${s.label}</span><span class="stat-value">${s.value}</span>`;
    sBox.appendChild(row);
  });
}

// ── Stats Generator ──
function getStats() {
  if (currentExp === 'projectile') {
    const a = p.angle * Math.PI / 180, v = p.v0, g = p.gravity;
    const R = v * v * Math.sin(2 * a) / g;
    const H = v * v * Math.sin(a) ** 2 / (2 * g);
    const T = 2 * v * Math.sin(a) / g;
    return [
      { label: 'Tầm xa (R)', value: R.toFixed(2) + ' m' },
      { label: 'Độ cao cực đại (H)', value: H.toFixed(2) + ' m' },
      { label: 'Thời gian bay (T)', value: T.toFixed(3) + ' s' },
      { label: 'Vận tốc đầu x (v₀ₓ)', value: (v * Math.cos(a)).toFixed(1) + ' m/s' },
      { label: 'Vận tốc đầu y (v₀ᵧ)', value: (v * Math.sin(a)).toFixed(1) + ' m/s' },
      { label: 'Thời gian thực tế', value: (proj.t || 0).toFixed(2) + ' s' }
    ];
  }
  if (currentExp === 'pendulum') {
    const L = p.length, g = p.gravity, th0 = p.amplitude * Math.PI / 180;
    const T0 = 2 * Math.PI * Math.sqrt(L / g);
    const T2 = T0 * (1 + th0 * th0 / 16 + 11 * th0 ** 4 / 3072);
    const E_total = g * L * (1 - Math.cos(th0));
    const E_kin = 0.5 * L * L * (pend.omega || 0) ** 2;
    const E_pot = g * L * (1 - Math.cos(pend.theta || th0));
    return [
      { label: 'Chu kỳ tuyến tính (T₀)', value: T0.toFixed(4) + ' s' },
      { label: 'Chu kỳ chính xác (T)', value: T2.toFixed(4) + ' s' },
      { label: 'Ly độ góc (θ)', value: ((pend.theta || 0) * 180 / Math.PI).toFixed(1) + '°' },
      { label: 'Vận tốc góc (ω)', value: (pend.omega || 0).toFixed(3) + ' rad/s' },
      { label: 'Động năng (E_kin %)', value: (E_kin / Math.max(E_total, 1e-9) * 100).toFixed(1) + '%' },
      { label: 'Thế năng (E_pot %)', value: (E_pot / Math.max(E_total, 1e-9) * 100).toFixed(1) + '%' }
    ];
  }
  if (currentExp === 'collision') {
    const m1 = p.m1, m2 = p.m2, v1i = p.v1, v2i = p.v2 || 0;
    const v1f = ((m1 - m2) * v1i + 2 * m2 * v2i) / (m1 + m2);
    const v2f = ((m2 - m1) * v2i + 2 * m1 * v1i) / (m1 + m2);
    const pi = m1 * v1i + m2 * v2i, pf = m1 * v1f + m2 * v2f;
    const KEi = 0.5 * m1 * v1i ** 2 + 0.5 * m2 * v2i ** 2;
    const KEf = 0.5 * m1 * v1f ** 2 + 0.5 * m2 * v2f ** 2;
    return [
      { label: "v₁' sau va chạm", value: v1f.toFixed(2) + ' m/s' },
      { label: "v₂' sau va chạm", value: v2f.toFixed(2) + ' m/s' },
      { label: 'Động lượng đầu (p_i)', value: pi.toFixed(2) + ' kg·m/s' },
      { label: 'Động lượng sau (p_f)', value: pf.toFixed(2) + ' kg·m/s' },
      { label: 'Động năng đầu (K_i)', value: KEi.toFixed(2) + ' J' },
      { label: 'Động năng sau (K_f)', value: KEf.toFixed(2) + ' J' }
    ];
  }
  if (currentExp === 'gas') {
    const R_gas = 0.0821, T = p.gT, V = p.gV, n = p.gn;
    const P = n * R_gas * T / V;
    const M = 0.029;
    const vrms = Math.sqrt(3 * 8.314 * T / M);
    return [
      { label: 'Áp suất khí (P)', value: P.toFixed(4) + ' atm' },
      { label: 'Vận tốc v_rms', value: vrms.toFixed(0) + ' m/s' },
      { label: 'Độ lớn V', value: V.toFixed(1) + ' L' },
      { label: 'Động năng hạt TB', value: (1.5 * 1.381e-23 * T * 1e23).toFixed(2) + ' ×10⁻²³ J' }
    ];
  }
  if (currentExp === 'carnot') {
    const T1 = p.T1, T2 = p.T2;
    if (T2 >= T1) return [{ label: 'Lỗi', value: 'TC >= TH' }];
    const eta = (1 - T2 / T1) * 100;
    const W_net = 'nR(T_H - T_C)ln(V₂/V₁)';
    return [
      { label: 'Hiệu suất (η)', value: eta.toFixed(2) + '%' },
      { label: 'Hiệu nhiệt độ (ΔT)', value: (T1 - T2) + ' K' },
      { label: 'Hệ số làm lạnh (COP)', value: (T2 / (T1 - T2)).toFixed(2) },
      { label: 'Công chu trình (W)', value: 'Hệ kín tuần hoàn' }
    ];
  }
  return [];
}

// ── Theory vs Simulation Verification ──
function buildVerificationPanel() {
  return `
    <div class="verify-panel" id="verifyPanel">
      <div class="verify-header">
        <span class="verify-icon">🔍</span>
        <span>Kiểm chứng đối chiếu dữ liệu</span>
      </div>
      <div class="verify-body" id="verifyBody">
        <div class="verify-loading">Đang chờ khởi động dữ liệu mô phỏng…</div>
      </div>
    </div>`;
}

function updateVerification() {
  const body = document.getElementById('verifyBody');
  if (!body) return;

  let rows = [];
  try {
    if (currentExp === 'projectile' && proj && proj.Tf) {
      const a = p.angle * Math.PI / 180, v = p.v0, g = p.gravity;
      const R_th = v * v * Math.sin(2 * a) / g;
      const H_th = v * v * Math.sin(a) ** 2 / (2 * g);
      const T_th = 2 * v * Math.sin(a) / g;
      const t = proj.t || 0;
      const x_sim = (proj.vx || 0) * t;
      const y_sim = (proj.vy || 0) * t - 0.5 * g * t * t;
      const progress = Math.min(t / Math.max(T_th, 0.01), 1);
      const landed = t >= T_th * 0.95;
      const simR = landed ? R_th : x_sim;
      const simH = Math.max(y_sim, 0);
      const errR = R_th > 0 ? Math.abs(simR - R_th) / R_th * 100 : 0;

      rows.push(makeVerifyRow('Tầm bay xa (R)', R_th.toFixed(2) + ' m', landed ? R_th.toFixed(2) + ' m' : x_sim.toFixed(2) + ' m', landed ? 0 : errR, 'R = \\frac{v_0^2 \\sin(2\\alpha)}{g}'));
      rows.push(makeVerifyRow('Độ cao cực đại (H)', H_th.toFixed(2) + ' m', simH.toFixed(2) + ' m', H_th > 0 ? Math.abs(simH - H_th) / H_th * 100 : 0, 'H = \\frac{v_0^2 \\sin^2(\\alpha)}{2g}'));
      rows.push(makeVerifyRow('Thời gian bay (T)', T_th.toFixed(3) + ' s', t.toFixed(3) + ' s', T_th > 0 ? Math.abs(t - T_th) / T_th * 100 : 0, 'T = \\frac{2v_0 \\sin(\\alpha)}{g}'));
      rows.push(makeProgressBar('Tiến trình quỹ đạo bay', progress));
    }
    else if (currentExp === 'pendulum' && pend && pend.theta !== undefined) {
      const L = p.length, g = p.gravity;
      const th0 = p.amplitude * Math.PI / 180;
      const T_simple = 2 * Math.PI * Math.sqrt(L / g);
      const T_corr = T_simple * (1 + th0 * th0 / 16 + 11 * Math.pow(th0, 4) / 3072);
      const E_total = g * L * (1 - Math.cos(th0));
      const omega = pend.omega || 0;
      const theta = pend.theta || 0;
      const E_kin = 0.5 * L * L * omega * omega;
      const E_pot = g * L * (1 - Math.cos(theta));
      const E_sum = E_kin + E_pot;
      const E_err = E_total > 1e-9 ? Math.abs(E_sum - E_total) / E_total * 100 : 0;

      rows.push(makeVerifyRow('Chu kỳ góc nhỏ T₀', T_simple.toFixed(4) + ' s', '—', null, 'T_0 = 2\\pi \\sqrt{\\frac{L}{g}}'));
      rows.push(makeVerifyRow('Chu kỳ hiệu chỉnh T', T_corr.toFixed(4) + ' s', '—', null, '\\text{Dao động phi tuyến bậc 4}'));
      rows.push(makeVerifyRow('Bảo toàn cơ năng E', E_total.toFixed(4) + ' J', E_sum.toFixed(4) + ' J', E_err, 'E = E_k + E_t = \\text{const}'));
      rows.push(makeProgressBar('Mức độ bảo toàn năng lượng', Math.max(0, 1 - E_err / 2)));
    }
    else if (currentExp === 'collision' && p.m1) {
      const m1 = p.m1, m2 = p.m2, v1i = p.v1, v2i = p.v2 || 0;
      const v1f = ((m1 - m2) * v1i + 2 * m2 * v2i) / (m1 + m2);
      const v2f = ((m2 - m1) * v2i + 2 * m1 * v1i) / (m1 + m2);
      const pi = m1 * v1i + m2 * v2i;
      const pf = m1 * v1f + m2 * v2f;
      const KEi = 0.5 * m1 * v1i * v1i + 0.5 * m2 * v2i * v2i;
      const KEf = 0.5 * m1 * v1f * v1f + 0.5 * m2 * v2f * v2f;
      const pErr = Math.abs(pi) > 1e-9 ? Math.abs(pf - pi) / Math.abs(pi) * 100 : 0;
      const keErr = KEi > 1e-9 ? Math.abs(KEf - KEi) / KEi * 100 : 0;

      rows.push(makeVerifyRow('Động lượng hệ p', pi.toFixed(2) + ' kg·m/s', pf.toFixed(2) + ' kg·m/s', pErr, '\\sum p_i = \\sum p_f'));
      rows.push(makeVerifyRow('Động năng hệ K', KEi.toFixed(2) + ' J', KEf.toFixed(2) + ' J', keErr, '\\sum E_{ki} = \\sum E_{kf}'));
      rows.push(makeVerifyRow("Vận tốc v₁' lý thuyết", v1f.toFixed(2) + ' m/s', '—', null, 'v_1\' = \\frac{m_1-m_2}{m_1+m_2}v_1 + \\frac{2m_2}{m_1+m_2}v_2'));
      rows.push(makeVerifyRow("Vận tốc v₂' lý thuyết", v2f.toFixed(2) + ' m/s', '—', null, 'v_2\' = \\frac{2m_1}{m_1+m_2}v_1 + \\frac{m_2-m_1}{m_1+m_2}v_2'));
    }
    else if (currentExp === 'gas' && p.gT) {
      const R_gas = 0.0821, T = p.gT, V = p.gV, n = p.gn;
      const P_th = n * R_gas * T / V;
      const M = 0.029;
      const vrms_th = Math.sqrt(3 * 8.314 * T / M);
      let vrms_sim = 0;
      if (gasState && gasState.particles && gasState.particles.length > 0) {
        let sumV2 = 0;
        gasState.particles.forEach(pt => { sumV2 += pt.vx * pt.vx + pt.vy * pt.vy; });
        vrms_sim = Math.sqrt(sumV2 / gasState.particles.length);
      }
      const expected_sim_vrms = Math.sqrt(2) * 2.0 * Math.sqrt(T / 300);
      const velScale = vrms_th / expected_sim_vrms;
      const vrms_sim_ms = vrms_sim * velScale;
      const vrmsErr = Math.abs(vrms_sim_ms - vrms_th) / vrms_th * 100;

      rows.push(makeVerifyRow('Áp suất lý thuyết P', P_th.toFixed(4) + ' atm', '—', null, 'P = \\frac{nRT}{V}'));
      rows.push(makeVerifyRow('Tốc độ v_rms căn bản', vrms_th.toFixed(0) + ' m/s', vrms_sim_ms.toFixed(0) + ' m/s', vrmsErr, 'v_{\\text{rms}} = \\sqrt{\\frac{3RT}{M}}'));
    }
    else if (currentExp === 'carnot' && p.T1 && p.T2) {
      const T1 = Number(p.T1), T2 = Number(p.T2);
      if (T2 < T1) {
        const eta = (1 - T2 / T1) * 100;
        const cop = T2 / (T1 - T2);
        rows.push(makeVerifyRow('Hiệu suất Carnot η', eta.toFixed(1) + ' %', '—', null, '\\eta = 1 - \\frac{T_C}{T_H}'));
        rows.push(makeVerifyRow('Hệ số lạnh COP', cop.toFixed(2), '—', null, '\\text{COP} = \\frac{T_C}{T_H - T_C}'));
      }
    }
  } catch (e) {
    console.error('Lỗi tính đối chiếu lý thuyết:', e);
  }

  if (rows.length === 0) {
    body.innerHTML = '<div class="verify-loading">Đang cập nhật luồng mô phỏng…</div>';
    return;
  }
  body.innerHTML = rows.join('');

  // Auto-render math in verify panel using KaTeX
  if (typeof renderMathInElement === 'function') {
    renderMathInElement(body, {
      delimiters: [
        {left: '$$', right: '$$', display: true},
        {left: '$', right: '$', display: false}
      ],
      throwOnError: false
    });
  }
}

function makeVerifyRow(label, theoryVal, simVal, errorPct, formula) {
  const hasError = errorPct !== null && errorPct !== undefined && simVal !== '—';
  let badgeHTML = '';
  if (hasError) {
    const errClass = errorPct < 0.5 ? 'verify-excellent' : errorPct < 3 ? 'verify-good' : 'verify-warn';
    const errIcon = errorPct < 0.5 ? '✓' : '•';
    const errText = errorPct < 0.5 ? 'Chính xác' : 'Sai lệch';
    badgeHTML = `<span class="verify-badge ${errClass}">${errIcon} ${errText} (${errorPct.toFixed(2)}%)</span>`;
  }
  return `
    <div class="verify-row">
      <div class="verify-row-header">
        <span class="verify-label">${label}</span>
        ${badgeHTML}
      </div>
      <div class="verify-values">
        <div class="verify-col">
          <span class="verify-col-label">📐 LÝ THUYẾT</span>
          <span class="verify-col-value">${theoryVal}</span>
        </div>
        ${simVal !== '—' ? `
        <div class="verify-col">
          <span class="verify-col-label">🎯 MÔ PHỎNG</span>
          <span class="verify-col-value">${simVal}</span>
        </div>` : ''}
      </div>
      <div class="verify-formula">$${formula}$</div>
    </div>`;
}

function makeProgressBar(label, ratio) {
  const pct = Math.max(0, Math.min(100, ratio * 100));
  const barColor = pct > 90 ? 'var(--accent-mint)' : pct > 40 ? 'var(--accent-indigo)' : 'var(--accent-rose)';
  return `
    <div class="verify-progress">
      <div class="verify-progress-label">${label}: ${pct.toFixed(0)}%</div>
      <div class="verify-progress-track">
        <div class="verify-progress-fill" style="width:${pct}%; background-color:${barColor}"></div>
      </div>
    </div>`;
}

// ── Runge-Kutta 4th Order Integrator ──
function rk4Step(theta, omega, dt, g, L) {
  const f = th => -(g / L) * Math.sin(th);
  const k1o = f(theta), k1t = omega;
  const k2o = f(theta + .5 * dt * k1t), k2t = omega + .5 * dt * k1o;
  const k3o = f(theta + .5 * dt * k2t), k3t = omega + .5 * dt * k2o;
  const k4o = f(theta + dt * k3t), k4t = omega + dt * k3o;
  return {
    theta: theta + dt / 6 * (k1t + 2 * k2t + 2 * k3t + k4t),
    omega: omega + dt / 6 * (k1o + 2 * k2o + 2 * k3o + k4o)
  };
}

// ── Box-Muller 2D Speed Generator ──
function sampleMB(sigma) {
  const u1 = Math.max(1e-10, Math.random()), u2 = Math.random();
  return {
    vx: sigma * Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2),
    vy: sigma * Math.sqrt(-2 * Math.log(u1)) * Math.sin(2 * Math.PI * u2)
  };
}

// ── Initialize Physics Engines ──
function initPhysics() {
  resizeCanvas();
  const W = canvas.width, H = canvas.height;
  if (W <= 0 || H <= 0) return;

  if (currentExp === 'projectile') {
    const a = p.angle * Math.PI / 180, v0 = p.v0, g = p.gravity;
    const R = v0 * v0 * Math.sin(2 * a) / g;
    const Hmax = v0 * v0 * Math.sin(a) ** 2 / (2 * g);
    const Tf = 2 * v0 * Math.sin(a) / g;
    const scaleX = (W - 140) / Math.max(R, 1);
    const scaleY = (H - 160) / Math.max(Hmax, 1);
    const scale = Math.min(scaleX, scaleY, 25);
    proj = {
      vx: v0 * Math.cos(a), vy: v0 * Math.sin(a), g, scale,
      ox: 70, oy: H - 80, t: 0, Tf, trail: [],
      R, Hmax
    };
  }
  else if (currentExp === 'pendulum') {
    const th0 = p.amplitude * Math.PI / 180;
    pend = { theta: th0, omega: 0, trail: [], thetaHistory: [] };
  }
  else if (currentExp === 'collision') {
    const m1 = p.m1, m2 = p.m2, v1i = p.v1, v2i = p.v2 || 0;
    const v1f = ((m1 - m2) * v1i + 2 * m2 * v2i) / (m1 + m2);
    const v2f = ((m2 - m1) * v2i + 2 * m1 * v1i) / (m1 + m2);
    const r1 = 16 + m1 * 6, r2 = 16 + m2 * 6;
    const VEL = 2.0; 
    coll = {
      x1: r1 + 40, x2: W / 2 + 100,
      r1, r2, v1i, v2i, v1f, v2f,
      by: H - 90, velScale: VEL,
      phase: 'approach', postTimer: 0, flash: 0,
      shockwaves: []
    };
  }
  else if (currentExp === 'gas') {
    initGas();
  }
  else if (currentExp === 'carnot') {
    carnotT = 0;
  }
}

function gasBox() {
  const W = canvas.width, H = canvas.height, V = p.gV || 22;
  const side = Math.max(120, Math.min(280, 210 * Math.sqrt(V / 22)));
  const cx = W / 2, cy = H / 2;
  return { cx, side, topY: cy - side / 2, botY: cy + side / 2, leftX: cx - side / 2, rightX: cx + side / 2 };
}

function initGas() {
  const { side, topY, leftX } = gasBox();
  const T = p.gT || 300;
  const sigma = 2.0 * Math.sqrt(T / 300);
  gasState = { particles: [], wallHits: 0 };
  for (let i = 0; i < 90; i++) {
    const { vx, vy } = sampleMB(sigma);
    gasState.particles.push({
      x: leftX + 8 + Math.random() * (side - 16),
      y: topY + 8 + Math.random() * (side - 16),
      vx, vy
    });
  }
}

function rebuildGasContainer() {
  if (!gasState.particles) return;
  const { leftX, rightX, topY, botY } = gasBox();
  gasState.particles.forEach(pt => {
    pt.x = Math.max(leftX + 6, Math.min(rightX - 6, pt.x));
    pt.y = Math.max(topY + 6, Math.min(botY - 6, pt.y));
  });
}

// ── Grid drawing with high-precision look ──
function drawGrid() {
  const W = canvas.width, H = canvas.height;
  ctx.fillStyle = C.grid;
  for (let x = 0; x < W; x += 30) {
    ctx.fillRect(x, 0, 1, H);
  }
  for (let y = 0; y < H; y += 30) {
    ctx.fillRect(0, y, W, 1);
  }
}

// ── PROJECTILE SIMULATION DRAWING ──
function drawProjectile(dt) {
  const W = canvas.width, H = canvas.height;
  ctx.fillStyle = C.bg; 
  ctx.fillRect(0, 0, W, H);
  drawGrid();

  const { vx, vy, g, scale, ox, oy, Tf, R, Hmax } = proj;

  // Ground rendering (SaaS elegant style)
  const grd = ctx.createLinearGradient(0, oy, 0, H);
  grd.addColorStop(0, 'rgba(99, 102, 241, 0.03)'); 
  grd.addColorStop(1, 'rgba(99, 102, 241, 0)');
  ctx.fillStyle = grd; 
  ctx.fillRect(0, oy, W, H - oy);
  ctx.strokeStyle = C.groundLine; 
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(0, oy); ctx.lineTo(W, oy); ctx.stroke();

  // Cartesian Axes
  ctx.strokeStyle = 'rgba(255,255,255,0.06)'; 
  ctx.lineWidth = 1;
  ctx.setLineDash([5, 5]);
  ctx.beginPath(); ctx.moveTo(ox, oy); ctx.lineTo(ox, 20); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(ox, oy); ctx.lineTo(W - 20, oy); ctx.stroke();
  ctx.setLineDash([]);

  // Axis Labels
  ctx.fillStyle = C.muted; 
  ctx.font = 'bold 11px var(--font-mono)';
  ctx.textAlign = 'center'; 
  ctx.fillText('x (m)', W - 25, oy + 20);
  ctx.fillText('y (m)', ox - 18, 24);

  // Draw launching angle sector (glowing arc)
  ctx.strokeStyle = 'rgba(245, 158, 11, 0.4)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(ox, oy, 40, 0, -p.angle * Math.PI / 180, true);
  ctx.stroke();
  ctx.fillStyle = 'rgba(245, 158, 11, 0.08)';
  ctx.beginPath();
  ctx.moveTo(ox, oy);
  ctx.arc(ox, oy, 40, 0, -p.angle * Math.PI / 180, true);
  ctx.closePath();
  ctx.fill();

  // Theoretical trajectory path (clean vector curve)
  ctx.beginPath(); 
  ctx.setLineDash([4, 4]);
  ctx.strokeStyle = 'rgba(255,255,255,0.12)'; 
  ctx.lineWidth = 1.5;
  for (let i = 0; i <= 100; i++) {
    const tt = (i / 100) * Tf;
    const px = ox + vx * tt * scale;
    const py = oy - (vy * tt - .5 * g * tt * tt) * scale;
    i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
  }
  ctx.stroke(); 
  ctx.setLineDash([]);

  // Max Height and Range markers
  const hx = ox + vx * (Tf / 2) * scale, hy = oy - Hmax * scale;
  ctx.setLineDash([2, 3]); 
  ctx.strokeStyle = 'rgba(245, 158, 11, 0.25)'; 
  ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(hx, hy); ctx.lineTo(hx, oy); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(ox, hy); ctx.lineTo(hx, hy); ctx.stroke();
  ctx.setLineDash([]);

  ctx.fillStyle = C.amber; 
  ctx.font = 'bold 12px var(--font-title)'; 
  ctx.textAlign = 'right';
  ctx.fillText('H = ' + Hmax.toFixed(2) + ' m', ox - 10, hy + 4);

  const rx = ox + R * scale;
  ctx.fillStyle = C.mint; 
  ctx.textAlign = 'center';
  ctx.fillText('R = ' + R.toFixed(2) + ' m', rx, oy + 22);

  // Time & position calculation
  if (running) {
    proj.t += dt * simSpeed;
    if (proj.t > Tf) {
      spawnParticles(ox + vx * Tf * scale, oy, C.amber, 20);
      const nextVy = vy * 0.65;
      const nextVx = vx * 0.85;
      const nextTf = 2 * nextVy / g;
      if (nextTf < 0.15) {
        initPhysics();
      } else {
        proj.ox = ox + vx * Tf * scale;
        proj.vx = nextVx;
        proj.vy = nextVy;
        proj.Tf = nextTf;
        proj.t = 0;
        proj.R = nextVx * nextTf;
        proj.Hmax = (nextVy * nextVy) / (2 * g);
      }
    }
  }

  const t = proj.t;
  const bx = ox + vx * t * scale;
  const by = oy - (vy * t - .5 * g * t * t) * scale;
  
  if (running) {
    addTrail(bx, by, C.cyan);
  }
  drawTrails();

  // Theoretical trajectory path (clean vector curve)
  ctx.beginPath();
  ctx.setLineDash([4, 4]);
  ctx.strokeStyle = 'rgba(255,255,255,0.12)'; 
  ctx.lineWidth = 1.5;
  for (let i = 0; i <= 100; i++) {
    const tt = (i / 100) * Tf;
    const px = ox + vx * tt * scale;
    const py = oy - (vy * tt - .5 * g * tt * tt) * scale;
    i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
  }
  ctx.stroke(); 
  ctx.setLineDash([]);

  // Draw velocity vector components (pro HUD look)
  const curVx = vx, curVy = vy - g * t;
  const vScale = 1.5;
  
  // Component Vx (Horizontal)
  ctx.strokeStyle = C.sky; ctx.lineWidth = 1; ctx.setLineDash([2, 2]);
  ctx.beginPath(); ctx.moveTo(bx, by); ctx.lineTo(bx + curVx * vScale, by); ctx.stroke();
  // Component Vy (Vertical)
  ctx.strokeStyle = C.rose;
  ctx.beginPath(); ctx.moveTo(bx, by); ctx.lineTo(bx, by - curVy * vScale); ctx.stroke();
  ctx.setLineDash([]);

  // Perpendicular projection lines to axis
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)'; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(bx, by); ctx.lineTo(bx, oy); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(bx, by); ctx.lineTo(ox, by); ctx.stroke();

  // Resultant Velocity Vector
  ctx.strokeStyle = C.amber; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(bx, by); ctx.lineTo(bx + curVx * vScale, by - curVy * vScale); ctx.stroke();
  
  // Arrowhead
  const arrowAngle = Math.atan2(-curVy, curVx);
  ctx.fillStyle = C.amber;
  ctx.beginPath();
  ctx.moveTo(bx + curVx * vScale, by - curVy * vScale);
  ctx.lineTo(bx + curVx * vScale - 6 * Math.cos(arrowAngle - 0.45), by - curVy * vScale + 6 * Math.sin(arrowAngle - 0.45));
  ctx.lineTo(bx + curVx * vScale - 6 * Math.cos(arrowAngle + 0.45), by - curVy * vScale + 6 * Math.sin(arrowAngle + 0.45));
  ctx.fill();

  // Ball - Sleek Gloss Sphere
  ctx.shadowColor = C.indigoGlow; ctx.shadowBlur = 10;
  const ballGrad = ctx.createRadialGradient(bx - 3, by - 3, 1, bx, by, 10);
  ballGrad.addColorStop(0, '#FFFFFF');
  ballGrad.addColorStop(0.3, '#A5B4FC');
  ballGrad.addColorStop(1, C.indigo);
  ctx.beginPath(); ctx.fillStyle = ballGrad;
  ctx.arc(bx, by, 10, 0, Math.PI * 2); ctx.fill();
  ctx.shadowBlur = 0;
  
  // Clean border
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)'; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.arc(bx, by, 10, 0, Math.PI * 2); ctx.stroke();

  // Live HUD Follow
  const curV = Math.sqrt(curVx ** 2 + curVy ** 2);
  drawHUD(bx, by, [
    `v = ${curV.toFixed(1)} m/s`,
    `x = ${(vx * t).toFixed(1)}m, y = ${Math.max(0, (vy * t - .5 * g * t * t)).toFixed(1)}m`
  ]);

  // Static readout top-left
  ctx.fillStyle = C.text; ctx.font = 'bold 12px var(--font-title)'; ctx.textAlign = 'left';
  ctx.fillText(`t = ${t.toFixed(2)} s`, ox + 15, 34);
}

// ── PENDULUM DAO ĐỘNG CON LẮC DRAWING ──
function drawPendulum(dt) {
  const W = canvas.width, H = canvas.height;
  ctx.clearRect(0, 0, W, H); drawGrid();

  const L = p.length, g = p.gravity;
  const STEPS = 15;
  if (running) {
    const subDt = dt * simSpeed / STEPS;
    for (let i = 0; i < STEPS; i++) {
      const res = rk4Step(pend.theta, pend.omega, subDt, g, L);
      pend.theta = res.theta; pend.omega = res.omega;
    }
    pend.thetaHistory.push(pend.theta);
    if (pend.thetaHistory.length > 220) pend.thetaHistory.shift();
  }

  const cx = W / 2, cy = 70;
  const pxL = Math.min(L * 140, H - 150);
  const bx = cx + Math.sin(pend.theta) * pxL;
  const by = cy + Math.cos(pend.theta) * pxL;

  // Equilibrium Line (Dây dọi)
  ctx.setLineDash([4, 4]); ctx.strokeStyle = 'rgba(255,255,255,0.05)'; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx, cy + pxL + 20); ctx.stroke();
  ctx.setLineDash([]);

  // Amplitude markers
  const th0 = p.amplitude * Math.PI / 180;
  ctx.strokeStyle = 'rgba(245, 158, 11, 0.15)'; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.sin(th0) * pxL, cy + Math.cos(th0) * pxL); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx - Math.sin(th0) * pxL, cy - Math.cos(th0) * -pxL); ctx.stroke();

  // Angular displacement arc indicator
  ctx.beginPath(); ctx.strokeStyle = 'rgba(99, 102, 241, 0.5)'; ctx.lineWidth = 1.5;
  const arcR = 40;
  if (pend.theta >= 0) {
    ctx.arc(cx, cy, arcR, Math.PI / 2, Math.PI / 2 - pend.theta, true);
  } else {
    ctx.arc(cx, cy, arcR, Math.PI / 2, Math.PI / 2 - pend.theta, false);
  }
  ctx.stroke();
  
  ctx.fillStyle = C.indigo; ctx.font = 'bold 11px var(--font-mono)'; ctx.textAlign = 'center';
  ctx.fillText(`${(pend.theta * 180 / Math.PI).toFixed(0)}°`, cx + Math.sin(pend.theta / 2) * 56, cy + Math.cos(pend.theta / 2) * 56);

  // Pendulum rod - Steel wire look
  ctx.strokeStyle = 'rgba(255,255,255,0.2)'; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(bx, by); ctx.stroke();

  // Bob shadow on wall (slightly offset)
  ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
  ctx.beginPath(); ctx.arc(bx + 15, by + 15, 18, 0, Math.PI * 2); ctx.fill();

  // Bob - Glass mirror chrome look
  ctx.shadowColor = C.indigoGlow; ctx.shadowBlur = 15;
  const sphereGrad = ctx.createRadialGradient(bx - 5, by - 5, 2, bx, by, 18);
  sphereGrad.addColorStop(0, '#FFFFFF');
  sphereGrad.addColorStop(0.2, '#C7D2FE');
  sphereGrad.addColorStop(0.8, '#4F46E5');
  sphereGrad.addColorStop(1, '#312E81');
  
  ctx.beginPath(); ctx.fillStyle = sphereGrad; ctx.arc(bx, by, 18, 0, Math.PI * 2); ctx.fill();
  ctx.shadowBlur = 0;
  ctx.strokeStyle = 'rgba(255,255,255,0.3)'; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.arc(bx, by, 18, 0, Math.PI * 2); ctx.stroke();

  // Hanging Stand (Giá đỡ cơ khí)
  ctx.fillStyle = C.bg2; ctx.strokeStyle = 'rgba(255,255,255,0.12)'; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.roundRect(cx - 30, cy - 10, 60, 10, 4); ctx.fill(); ctx.stroke();
  ctx.fillStyle = '#64748B'; ctx.beginPath(); ctx.arc(cx, cy - 5, 4, 0, Math.PI*2); ctx.fill();

  // Oscilloscope Real-time Waveform Display
  if (pend.thetaHistory && pend.thetaHistory.length > 2) {
    const gx = 20, gy = H - 90, gw = 180, gh = 64;
    
    // Graph Panel Box
    ctx.fillStyle = '#030508'; ctx.fillRect(gx, gy, gw, gh);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)'; ctx.lineWidth = 1;
    ctx.strokeRect(gx, gy, gw, gh);
    
    // Waveform grid lines
    ctx.fillStyle = 'rgba(16, 185, 129, 0.05)';
    for (let xi = gx + 20; xi < gx + gw; xi += 20) ctx.fillRect(xi, gy, 1, gh);
    for (let yi = gy + 10; yi < gy + gh; yi += 10) ctx.fillRect(gx, yi, gw, 1);

    // Midline
    ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.fillRect(gx, gy + gh / 2, gw, 1);

    // Plot values
    ctx.beginPath(); ctx.strokeStyle = C.mint; ctx.lineWidth = 1.5;
    const hist = pend.thetaHistory;
    hist.forEach((th, i) => {
      const hx = gx + (i / hist.length) * gw;
      const hy = gy + gh / 2 - (th / th0) * (gh / 2.2);
      i === 0 ? ctx.moveTo(hx, hy) : ctx.lineTo(hx, hy);
    });
    ctx.stroke();

    ctx.fillStyle = C.text; ctx.font = 'bold 9px var(--font-mono)'; ctx.textAlign = 'left';
    ctx.fillText('OSCILLOSCOPE θ(t)', gx + 6, gy - 8);
  }
}

// ── COLLISION SIMULATION DRAWING ──
function drawCollision() {
  const W = canvas.width, H = canvas.height;
  ctx.clearRect(0, 0, W, H); drawGrid();

  const floorY = H - 90;
  // Sleek tech floor line
  ctx.fillStyle = 'rgba(255,255,255,0.01)'; ctx.fillRect(0, floorY, W, H - floorY);
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)'; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(0, floorY); ctx.lineTo(W, floorY); ctx.stroke();

  const { r1, r2, v1i, v2i, v1f, v2f, by, velScale } = coll;

  if (running) {
    if (coll.phase === 'approach') {
      coll.x1 += v1i * velScale;
      coll.x2 += v2i * velScale;
      if (coll.x1 + r1 >= coll.x2 - r2) {
        coll.x1 = coll.x2 - r1 - r2;
        coll.phase = 'post'; coll.postTimer = 0; coll.flash = 1;
        // Collision explosion rings
        coll.shockwaves.push({ x: coll.x1 + r1, y: by - r1, r: 2, maxR: 45, life: 1.0 });
        spawnParticles(coll.x1 + r1, by - r1, C.indigo, 15);
      }
    } else {
      coll.x1 += v1f * velScale;
      coll.x2 += v2f * velScale;
      coll.postTimer++;
      if (coll.flash > 0) coll.flash -= 0.025;
      if (coll.postTimer > 180) {
        coll.x1 = r1 + 40; coll.x2 = W / 2 + 100;
        coll.phase = 'approach'; coll.flash = 0;
      }
    }
  }

  // Draw active shockwaves
  if (coll.shockwaves) {
    for (let i = coll.shockwaves.length - 1; i >= 0; i--) {
      const sw = coll.shockwaves[i];
      sw.r += 2.2;
      sw.life -= 0.02;
      if (sw.life <= 0) {
        coll.shockwaves.splice(i, 1);
      } else {
        ctx.strokeStyle = `rgba(255, 255, 255, ${sw.life * 0.4})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.r, 0, Math.PI * 2);
        ctx.stroke();
      }
    }
  }

  // Subtle background glow on collision impact
  if (coll.flash > 0) {
    const cx = (coll.x1 + coll.x2) / 2;
    const impactGrd = ctx.createRadialGradient(cx, by - r1, 2, cx, by - r1, 60);
    impactGrd.addColorStop(0, `rgba(99, 102, 241, ${coll.flash * 0.15})`);
    impactGrd.addColorStop(1, 'transparent');
    ctx.fillStyle = impactGrd; ctx.fillRect(0, 0, W, H);
  }

  // Helper function to render modern glass-shaded balls
  const renderBall = (x, r, color, label, vel, mass) => {
    const yc = by - r;
    // Ground Shadow shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.beginPath(); ctx.ellipse(x, by + 2, r * 0.95, r * 0.2, 0, 0, Math.PI * 2); ctx.fill();

    // 3D Sphere shading
    const sphereGrd = ctx.createRadialGradient(x - r/3, yc - r/3, r/8, x, yc, r);
    sphereGrd.addColorStop(0, '#FFFFFF');
    sphereGrd.addColorStop(0.3, color);
    sphereGrd.addColorStop(1, 'rgba(0, 0, 0, 0.45)');
    ctx.fillStyle = sphereGrd;
    ctx.beginPath(); ctx.arc(x, yc, r, 0, Math.PI * 2); ctx.fill();

    // High quality shell line
    ctx.strokeStyle = 'rgba(255,255,255,0.18)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.arc(x, yc, r, 0, Math.PI * 2); ctx.stroke();

    // Label tag
    ctx.fillStyle = '#FFFFFF'; ctx.font = `bold ${Math.max(r * 0.5, 11)}px var(--font-title)`;
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(label, x, yc);
    
    ctx.fillStyle = C.muted; ctx.font = '11px var(--font-mono)'; ctx.textBaseline = 'top';
    ctx.fillText(`${mass.toFixed(1)} kg`, x, yc + r + 10);

    // Vector velocity arrows
    if (Math.abs(vel) > 0.05) {
      const dir = Math.sign(vel);
      const arrowLen = Math.min(Math.abs(vel) * 12, 100) * dir;
      const ay = yc - r - 10;
      
      ctx.strokeStyle = color; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(x, ay); ctx.lineTo(x + arrowLen, ay); ctx.stroke();
      
      // Arrow tip
      ctx.fillStyle = color; ctx.beginPath();
      ctx.moveTo(x + arrowLen, ay);
      ctx.lineTo(x + arrowLen - 6 * dir, ay - 3);
      ctx.lineTo(x + arrowLen - 6 * dir, ay + 3); ctx.fill();
      
      ctx.font = 'bold 10px var(--font-mono)'; ctx.textAlign = 'center';
      ctx.fillText(`${vel.toFixed(1)} m/s`, x + arrowLen/2, ay - 14);
    }
  };

  const currentV1 = coll.phase === 'approach' ? v1i : v1f;
  const currentV2 = coll.phase === 'approach' ? v2i : v2f;

  renderBall(coll.x1, r1, C.rose, 'm₁', currentV1, p.m1);
  renderBall(coll.x2, r2, C.cyan, 'm₂', currentV2, p.m2);

  // Status Indicator Text
  ctx.fillStyle = coll.phase === 'approach' ? C.text : C.indigo;
  ctx.font = 'bold 13px var(--font-title)'; ctx.textAlign = 'center';
  ctx.fillText(coll.phase === 'approach' ? '● TIẾN TRÌNH: TRƯỚC VA CHẠM' : '✦ KẾT QUẢ: SAU VA CHẠM', W / 2, 28);
}

// ── GAS SIMULATION DRAWING ──
function drawGas() {
  const W = canvas.width, H = canvas.height;
  ctx.clearRect(0, 0, W, H);

  const { cx, side, topY, botY, leftX, rightX } = gasBox();
  const T = p.gT, sigma = 2.0 * Math.sqrt(T / 300);

  if (running && gasState.particles) {
    gasState.wallHits = 0;
    gasState.particles.forEach(pt => {
      pt.x += pt.vx * simSpeed;
      pt.y += pt.vy * simSpeed;
      
      // Elastic wall bounces
      if (pt.x < leftX + 5) { pt.vx = Math.abs(pt.vx); pt.x = leftX + 5; gasState.wallHits++; }
      if (pt.x > rightX - 5) { pt.vx = -Math.abs(pt.vx); pt.x = rightX - 5; gasState.wallHits++; }
      if (pt.y < topY + 5) { pt.vy = Math.abs(pt.vy); pt.y = topY + 5; gasState.wallHits++; }
      if (pt.y > botY - 5) { pt.vy = -Math.abs(pt.vy); pt.y = botY - 5; gasState.wallHits++; }
    });
  }

  // Piston container box (glass look)
  ctx.fillStyle = 'rgba(255,255,255,0.01)'; ctx.fillRect(leftX, topY, side, side);
  ctx.strokeStyle = 'rgba(255,255,255,0.08)'; ctx.lineWidth = 2;
  ctx.strokeRect(leftX, topY, side, side);

  // Gas molecules rendering with velocity-colored glow vector tails
  if (gasState.particles) {
    gasState.particles.forEach(pt => {
      const velocity = Math.sqrt(pt.vx ** 2 + pt.vy ** 2);
      const ratio = Math.min(velocity / (sigma * 2.2), 1.0);
      
      // Blend Blue (slow) -> Mint (medium) -> Amber/Red (fast)
      let r, g, b;
      if (ratio < 0.5) {
        const factor = ratio * 2;
        r = Math.round(99 + (16 - 99) * factor);
        g = Math.round(102 + (185 - 102) * factor);
        b = Math.round(241 + (129 - 241) * factor);
      } else {
        const factor = (ratio - 0.5) * 2;
        r = Math.round(16 + (239 - 16) * factor);
        g = Math.round(185 + (68 - 185) * factor);
        b = Math.round(129 + (68 - 129) * factor);
      }

      // Sleek tech vector lines representing velocity trails
      ctx.strokeStyle = `rgba(${r},${g},${b},0.3)`; ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(pt.x - pt.vx * 1.5, pt.y - pt.vy * 1.5);
      ctx.lineTo(pt.x, pt.y);
      ctx.stroke();

      // Molecule core dot
      ctx.fillStyle = `rgb(${r},${g},${b})`;
      ctx.beginPath(); ctx.arc(pt.x, pt.y, 3, 0, Math.PI * 2); ctx.fill();
    });
  }

  // Mechanical Piston Head drawing
  ctx.fillStyle = '#1E293B'; ctx.fillRect(leftX - 4, topY - 10, side + 8, 10);
  ctx.strokeStyle = 'rgba(255,255,255,0.18)'; ctx.lineWidth = 1;
  ctx.strokeRect(leftX - 4, topY - 10, side + 8, 10);
  ctx.fillStyle = '#64748B'; ctx.fillRect(cx - 8, topY - 26, 16, 16);

  // Digital readout panel inside canvas
  const P = (p.gn * 0.0821 * T / p.gV).toFixed(3);
  ctx.fillStyle = C.text; ctx.font = 'bold 12px var(--font-title)'; ctx.textAlign = 'left';
  const lx = rightX + 24, ly = topY + 20;
  ctx.fillText(`T = ${T} K`, lx, ly);
  ctx.fillText(`V = ${p.gV} L`, lx, ly + 20);
  ctx.fillText(`n = ${p.gn} mol`, lx, ly + 40);
  ctx.fillStyle = C.sky; ctx.font = 'bold 14px var(--font-mono)';
  ctx.fillText(`P = ${P} atm`, lx, ly + 68);

  // Velocity distribution legend
  ctx.fillStyle = C.muted; ctx.font = '9px var(--font-mono)'; ctx.textAlign = 'center';
  ctx.fillText('VẬN TỐC HẠT (CHẬM → NHANH)', cx, botY + 16);
  const barW = 120;
  for (let i = 0; i < barW; i++) {
    const ratio = i / barW;
    let r, g, b;
    if (ratio < 0.5) {
      const factor = ratio * 2; r = Math.round(99 + (16 - 99) * factor); g = Math.round(102 + (185 - 102) * factor); b = Math.round(241 + (129 - 241) * factor);
    } else {
      const factor = (ratio - 0.5) * 2; r = Math.round(16 + (239 - 16) * factor); g = Math.round(185 + (68 - 185) * factor); b = Math.round(129 + (68 - 129) * factor);
    }
    ctx.fillStyle = `rgb(${r},${g},${b})`;
    ctx.fillRect(cx - barW / 2 + i, botY + 22, 1, 4);
  }
}

// ── CARNOT CYCLE PV DIAGRAM & PISTON MODEL DRAWING ──
function drawCarnot() {
  const W = canvas.width, H = canvas.height;
  ctx.clearRect(0, 0, W, H);

  const T1 = p.T1 || 650, T2 = p.T2 || 250;
  if (T2 >= T1) {
    ctx.fillStyle = C.rose; ctx.font = 'bold 14px var(--font-title)'; ctx.textAlign = 'center';
    ctx.fillText('⚠ Lỗi tham số: Yêu cầu nhiệt độ TC < TH', W / 2, H / 2);
    return;
  }

  const GAMMA = 5 / 3, n = 1.0, R_c = 1.0;
  const V1 = 1.0, V2 = 2.4;
  const exp1 = 1 / (GAMMA - 1);
  const V3 = V2 * Math.pow(T1 / T2, exp1);
  const V4 = V1 * Math.pow(T1 / T2, exp1);
  const PA = n * R_c * T1 / V1, PB = n * R_c * T1 / V2;
  const PC = n * R_c * T2 / V3, PD = n * R_c * T2 / V4;
  const C_BC = PB * Math.pow(V2, GAMMA), C_DA = PD * Math.pow(V4, GAMMA);

  const allV = [V1, V2, V3, V4], allP = [PA, PB, PC, PD];
  const Vmin = Math.min(...allV) * 0.8, Vmax = Math.max(...allV) * 1.15;
  const Pmin = Math.min(...allP) * 0.8, Pmax = Math.max(...allP) * 1.15;

  // Render P-V Diagram Axes (Technical look)
  const ox = 70, oy = H - 55, pw = W - ox - 200, ph = oy - 45;
  const toX = v => ox + (v - Vmin) / (Vmax - Vmin) * pw;
  const toY = pp => oy - (pp - Pmin) / (Pmax - Pmin) * ph;

  ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)'; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(ox, 30); ctx.lineTo(ox, oy); ctx.lineTo(ox + pw + 20, oy); ctx.stroke();
  
  ctx.fillStyle = C.muted; ctx.font = 'bold 9px var(--font-mono)';
  ctx.textAlign = 'center'; ctx.fillText('V (m³)', ox + pw + 10, oy + 14);
  ctx.save(); ctx.translate(ox - 14, 40); ctx.rotate(-Math.PI / 2); ctx.fillText('P (Pa)', 0, 0); ctx.restore();

  // Cycle volume shading
  ctx.beginPath(); ctx.globalAlpha = 0.03;
  const fillPts = [];
  for (let i = 0; i <= 30; i++) { const v = V1 + (V2 - V1) * i / 30; fillPts.push([toX(v), toY(n * R_c * T1 / v)]); }
  for (let i = 0; i <= 30; i++) { const v = V2 + (V3 - V2) * i / 30; fillPts.push([toX(v), toY(C_BC / Math.pow(v, GAMMA))]); }
  for (let i = 0; i <= 30; i++) { const v = V3 + (V4 - V3) * i / 30; fillPts.push([toX(v), toY(n * R_c * T2 / v)]); }
  for (let i = 0; i <= 30; i++) { const v = V4 + (V1 - V4) * i / 30; fillPts.push([toX(v), toY(C_DA / Math.pow(v, GAMMA))]); }
  ctx.moveTo(fillPts[0][0], fillPts[0][1]);
  fillPts.forEach(pt => ctx.lineTo(pt[0], pt[1]));
  ctx.closePath(); ctx.fillStyle = C.indigo; ctx.fill();
  ctx.globalAlpha = 1.0;

  // Plot Curves
  const plotCurve = (Vs, Ve, fn, color) => {
    ctx.beginPath(); ctx.strokeStyle = color; ctx.lineWidth = 2.5;
    for (let i = 0; i <= 50; i++) {
      const v = Vs + (Ve - Vs) * i / 50;
      i === 0 ? ctx.moveTo(toX(v), toY(fn(v))) : ctx.lineTo(toX(v), toY(fn(v)));
    }
    ctx.stroke();
  };

  plotCurve(V1, V2, v => n * R_c * T1 / v, C.rose); // TH isothermal
  plotCurve(V2, V3, v => C_BC / Math.pow(v, GAMMA), 'rgba(255,255,255,0.18)'); // Adiabatic expansion
  plotCurve(V3, V4, v => n * R_c * T2 / v, C.sky); // TC isothermal
  plotCurve(V4, V1, v => C_DA / Math.pow(v, GAMMA), 'rgba(255,255,255,0.18)'); // Adiabatic compression

  // Vertex Nodes
  [[V1, PA, '1', C.rose], [V2, PB, '2', C.rose], [V3, PC, '3', C.sky], [V4, PD, '4', C.sky]].forEach(([v, pp, lb, col]) => {
    ctx.beginPath(); ctx.fillStyle = col; ctx.arc(toX(v), toY(pp), 5, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.3)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.arc(toX(v), toY(pp), 5, 0, Math.PI * 2); ctx.stroke();
    
    ctx.fillStyle = C.text; ctx.font = 'bold 11px var(--font-title)'; ctx.textAlign = 'left';
    ctx.fillText(lb, toX(v) + 8, toY(pp) - 4);
  });

  // Cycle running indicator dot
  if (running) carnotT = (carnotT + 0.003 * simSpeed) % 1.0;
  const seg = Math.floor(carnotT * 4), frac = (carnotT * 4) % 1.0;
  let dotV, dotP;
  if (seg === 0) { dotV = V1 + (V2 - V1) * frac; dotP = n * R_c * T1 / dotV; }
  else if (seg === 1) { dotV = V2 + (V3 - V2) * frac; dotP = C_BC / Math.pow(dotV, GAMMA); }
  else if (seg === 2) { dotV = V3 + (V4 - V3) * frac; dotP = n * R_c * T2 / dotV; }
  else { dotV = V4 + (V1 - V4) * frac; dotP = C_DA / Math.pow(dotV, GAMMA); }
  
  ctx.shadowColor = C.amber; ctx.shadowBlur = 10;
  ctx.beginPath(); ctx.fillStyle = C.amber; ctx.arc(toX(dotV), toY(dotP), 6, 0, Math.PI * 2); ctx.fill();
  ctx.shadowBlur = 0;

  // ── WOW FEATURE: Real-time mechanical cylinder diagram ──
  const cx_cyl = W - 100;
  const cy_cyl = 70;
  const cylW = 60;
  const cylH = 100;

  // Map volume dotV to piston displacement
  const vRatio = (dotV - Vmin) / (Vmax - Vmin); 
  const pistonY = cy_cyl + 10 + vRatio * (cylH - 30);

  // Gas color mapping based on actual temperature
  let gasColor;
  if (seg === 0) {
    gasColor = 'rgba(239, 68, 68, 0.20)'; // Hot red
  } else if (seg === 1) {
    // Red to Blue transition
    const r = Math.round(239 - (239 - 99) * frac);
    const g = Math.round(68 + (102 - 68) * frac);
    const b = Math.round(68 + (241 - 68) * frac);
    gasColor = `rgba(${r}, ${g}, ${b}, 0.20)`;
  } else if (seg === 2) {
    gasColor = 'rgba(99, 102, 241, 0.20)'; // Cold blue
  } else {
    // Blue to Red transition
    const r = Math.round(99 + (239 - 99) * frac);
    const g = Math.round(102 - (102 - 68) * frac);
    const b = Math.round(241 - (241 - 68) * frac);
    gasColor = `rgba(${r}, ${g}, ${b}, 0.20)`;
  }

  // Draw gas inside cylinder
  ctx.fillStyle = gasColor;
  ctx.fillRect(cx_cyl - cylW / 2, pistonY, cylW, cy_cyl + cylH - pistonY);

  // Draw cylinder metal body
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)'; ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(cx_cyl - cylW / 2, cy_cyl);
  ctx.lineTo(cx_cyl - cylW / 2, cy_cyl + cylH);
  ctx.lineTo(cx_cyl + cylW / 2, cy_cyl + cylH);
  ctx.lineTo(cx_cyl + cylW / 2, cy_cyl);
  ctx.stroke();

  // Piston shaft head
  ctx.fillStyle = '#1E293B'; ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)'; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.roundRect(cx_cyl - cylW / 2 - 2, pistonY - 8, cylW + 4, 8, 2); ctx.fill(); ctx.stroke();

  // Piston piston connecting rod
  ctx.strokeStyle = '#64748B'; ctx.lineWidth = 5;
  ctx.beginPath(); ctx.moveTo(cx_cyl, pistonY - 8); ctx.lineTo(cx_cyl, cy_cyl - 15); ctx.stroke();

  // Cylinder tag
  ctx.fillStyle = C.text; ctx.font = 'bold 9px var(--font-title)'; ctx.textAlign = 'center';
  ctx.fillText('XI-LANH NHIỆT', cx_cyl, cy_cyl - 24);

  // Cycle Phase Display
  const phaseTexts = [
    '1→2: GIÃN ĐẲNG NHIỆT (T_H)',
    '2→3: GIÃN ĐOẠN NHIỆT',
    '3→4: NÉN ĐẲNG NHIỆT (T_C)',
    '4→1: NÉN ĐOẠN NHIỆT'
  ];
  ctx.fillStyle = seg === 0 || seg === 1 ? C.rose : C.sky;
  ctx.font = 'bold 11px var(--font-title)';
  ctx.fillText(phaseTexts[seg], W / 2, 28);
}

// ── ANIMATION TICK LOOP ──
function render(ts) {
  if (!lastTs) lastTs = ts;
  const dt = Math.min((ts - lastTs) / 1000, 0.05);
  lastTs = ts;
  
  resizeCanvas();
  
  switch (currentExp) {
    case 'projectile': drawProjectile(dt); break;
    case 'pendulum': drawPendulum(dt); break;
    case 'collision': drawCollision(); break;
    case 'gas': drawGas(); break;
    case 'carnot': drawCarnot(); break;
  }
  
  updateStats();
  updateVerification();
  updateAndDrawParticles();
  animId = requestAnimationFrame(render);
}

// ── Event Bindings ──

  // Collapsible Panels
  document.querySelectorAll('.toggle-header').forEach(header => {
    header.addEventListener('click', (e) => {
      // Bỏ qua nếu bấm vào nút copy
      if (e.target.closest('.copy-btn')) return;
      const card = header.closest('.bento-card');
      if (card) {
        card.classList.toggle('collapsed');
      }
    });
  });

  document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentExp = btn.dataset.exp;
    p = {};
    lastTs = null;
    renderUI();
    initPhysics();
    // Hide mobile sidebar
    const sb = document.getElementById('sidebar');
    if (sb) sb.classList.remove('open');
  });
});

btnPause.addEventListener('click', () => {
  running = !running;
  document.getElementById('pauseIcon').textContent = running ? '⏸' : '▶';
  document.getElementById('pauseText').textContent = running ? 'Tạm dừng' : 'Tiếp tục';
  btnPause.classList.toggle('paused', !running);
});

  btnReset.addEventListener('click', () => { initPhysics(); lastTs = null; });

  const btnZenMode = document.getElementById('btnZenMode');
  if (btnZenMode) {
    btnZenMode.addEventListener('click', () => {
      document.querySelector('.workspace').classList.toggle('zen-mode');
      setTimeout(() => {
        resizeCanvas();
        initPhysics();
      }, 350);
    });
  }
window.addEventListener('resize', () => { resizeCanvas(); initPhysics(); });

canvas.addEventListener('mousemove', (e) => {
  const rect = canvas.getBoundingClientRect();
  mouseX = (e.clientX - rect.left) / zoomLevel;
  mouseY = (e.clientY - rect.top) / zoomLevel;
});
canvas.addEventListener('mouseleave', () => {
  mouseX = -1000;
  mouseY = -1000;
});

// ── Mobile Menu controls ──
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');
if (menuToggle && sidebar) {
  menuToggle.addEventListener('click', () => sidebar.classList.toggle('open'));
}

// ── Particle System VFX ──
function spawnParticles(x, y, color, count) {
  for (let i = 0; i < count; i++) {
    const ang = Math.random() * Math.PI * 2;
    const speed = Math.random() * 6 + 1.5;
    vfxParticles.push({
      x, y,
      vx: Math.cos(ang) * speed,
      vy: Math.sin(ang) * speed,
      life: 1.0,
      color
    });
  }
}

function updateAndDrawParticles() {
  const W = canvas.width, H = canvas.height;
  
  // Ambient Quantum Dust
  if (Math.random() < 0.3) {
    ambientParticles.push({
      x: Math.random() * W,
      y: H + 10,
      vx: (Math.random() - 0.5) * 0.5,
      vy: -Math.random() * 1.5 - 0.5,
      life: Math.random() * 0.4 + 0.1,
      size: Math.random() * 2 + 0.5,
      color: Math.random() > 0.5 ? C.cyan : C.purple
    });
  }

  ctx.shadowBlur = 10;
  for (let i = ambientParticles.length - 1; i >= 0; i--) {
    const pt = ambientParticles[i];
    
    // Tương tác chuột (Quantum repulsion)
    if (mouseX > 0 && mouseY > 0) {
      const dx = pt.x - mouseX;
      const dy = pt.y - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100) {
        const force = (100 - dist) / 100;
        pt.vx += (dx / dist) * force * 0.5;
        pt.vy += (dy / dist) * force * 0.5;
      }
    }
    
    // Giảm tốc độ trôi (Friction)
    pt.vx *= 0.98;
    pt.vy = pt.vy * 0.98 - 0.02;

    pt.x += pt.vx;
    pt.y += pt.vy;
    pt.life -= 0.001;
    if (pt.life <= 0 || pt.y < -10 || pt.x < -10 || pt.x > W + 10) {
      ambientParticles.splice(i, 1);
      continue;
    }
    ctx.globalAlpha = pt.life;
    ctx.fillStyle = pt.color;
    ctx.shadowColor = pt.color;
    ctx.beginPath();
    ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1.0;
  ctx.shadowBlur = 0;

  // Collision/Explosion Particles
  if (!vfxParticles || vfxParticles.length === 0) return;
  for (let i = vfxParticles.length - 1; i >= 0; i--) {
    const pt = vfxParticles[i];
    pt.x += pt.vx;
    pt.y += pt.vy;
    pt.vy += 0.22; // gravity effect
    pt.life -= 0.025;
    if (pt.life <= 0) {
      vfxParticles.splice(i, 1);
      continue;
    }
    ctx.globalAlpha = pt.life;
    ctx.fillStyle = pt.color;
    ctx.shadowColor = pt.color;
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.arc(pt.x, pt.y, pt.life * 3, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1.0;
  ctx.shadowBlur = 0;

  // Draw Quantum Cursor Glow
  if (mouseX > 0 && mouseY > 0) {
    const grad = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 80);
    grad.addColorStop(0, 'rgba(0, 240, 255, 0.15)');
    grad.addColorStop(1, 'rgba(0, 240, 255, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(mouseX - 80, mouseY - 80, 160, 160);
  }
}

// ── Motion Trails Logic ──
function addTrail(x, y, color) {
  trails.push({ x, y, color, life: 1.0 });
  if (trails.length > 50) trails.shift();
}

function drawTrails() {
  if (trails.length === 0) return;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  for (let i = trails.length - 1; i >= 0; i--) {
    const t = trails[i];
    t.life -= 0.04;
    if (t.life <= 0) {
      trails.splice(i, 1);
      continue;
    }
    ctx.globalAlpha = t.life;
    ctx.beginPath();
    ctx.arc(t.x, t.y, t.life * 2.5, 0, Math.PI * 2);
    ctx.fillStyle = t.color;
    ctx.shadowColor = t.color;
    ctx.shadowBlur = 10 * t.life;
    ctx.fill();
  }
  ctx.globalAlpha = 1.0;
  ctx.shadowBlur = 0;
}

// ── Live HUD Logic ──
function drawHUD(x, y, dataLines) {
  ctx.font = '11px "JetBrains Mono"';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
  ctx.textAlign = 'left';
  ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
  ctx.shadowBlur = 4;
  dataLines.forEach((line, idx) => {
    ctx.fillText(line, x + 15, y - 10 + idx * 14);
  });
  ctx.shadowBlur = 0;
}

// ── Initial Start trigger ──
renderUI();
initPhysics();
requestAnimationFrame(render);
