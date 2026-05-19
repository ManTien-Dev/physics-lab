// ═══════════════════════════════════════════════════
// PHÒNG THÍ NGHIỆM VẬT LÝ ĐẠI CƯƠNG
// Mô phỏng chính xác – nghiệm giải tích & RK4
// ═══════════════════════════════════════════════════

// ── Cấu hình thí nghiệm ──
const EXPERIMENTS = {
  projectile: {
    title: 'Ném xiên',
    subtitle: 'Nghiệm giải tích – quỹ đạo parabol chính xác',
    latex: 'y = x\\tan\\alpha - \\dfrac{gx^2}{2v_0^2\\cos^2\\alpha}',
    params: [
      { key: 'angle', label: 'α', unit: '°', min: 5, max: 85, step: 1, val: 45, color: '#f59e0b' },
      { key: 'v0', label: 'v₀', unit: 'm/s', min: 5, max: 60, step: 1, val: 30, color: '#6c8cff' },
      { key: 'gravity', label: 'g', unit: 'm/s²', min: 1, max: 20, step: 0.1, val: 9.8, color: '#34d399' }
    ],
    theory: `<div class="theory-title">📖 Lý thuyết</div>
      <p>Chuyển động ném xiên là tổ hợp của chuyển động <b>thẳng đều</b> theo phương ngang và <b>rơi tự do</b> theo phương đứng.</p>
      <p class="formula-label">Phương trình chuyển động:</p>
      <div class="formula">x(t) = v₀ · cos(α) · t</div>
      <div class="formula">y(t) = v₀ · sin(α) · t − ½g · t²</div>
      <p class="formula-label">Tầm bay xa:</p>
      <div class="formula">R = v₀² · sin(2α) / g</div>
      <p class="formula-label">Độ cao cực đại:</p>
      <div class="formula">H = v₀² · sin²(α) / (2g)</div>
      <p>Quỹ đạo là một <b>parabol</b>. Tầm xa cực đại đạt khi <b>α = 45°</b>.</p>`
  },
  pendulum: {
    title: 'Con lắc đơn',
    subtitle: 'Tích phân Runge-Kutta bậc 4 – chính xác góc lớn',
    latex: '\\ddot{\\theta} = -\\dfrac{g}{L}\\sin\\theta',
    params: [
      { key: 'length', label: 'L', unit: 'm', min: 0.2, max: 3, step: 0.1, val: 1.5, color: '#f59e0b' },
      { key: 'gravity', label: 'g', unit: 'm/s²', min: 1, max: 20, step: 0.1, val: 9.8, color: '#34d399' },
      { key: 'amplitude', label: 'θ₀', unit: '°', min: 5, max: 170, step: 1, val: 45, color: '#6c8cff' }
    ],
    theory: `<div class="theory-title">📖 Lý thuyết</div>
      <p>Con lắc đơn tuân theo phương trình vi phân <b>phi tuyến</b>:</p>
      <div class="formula">θ̈ = −(g / L) · sin(θ)</div>
      <p class="formula-label">Chu kỳ (xấp xỉ góc nhỏ):</p>
      <div class="formula">T = 2π · √(L / g)</div>
      <p>Mô phỏng sử dụng phương pháp <b>Runge-Kutta bậc 4</b> (RK4) nên chính xác cả ở biên độ lớn.</p>
      <p class="formula-label">Bảo toàn năng lượng:</p>
      <div class="formula">E = Eₖ + Eₜ = const</div>`
  },
  collision: {
    title: 'Va chạm đàn hồi',
    subtitle: 'Bảo toàn động lượng & động năng – animation chính xác',
    latex: 'v_1\'=\\dfrac{m_1-m_2}{m_1+m_2}v_1 \\quad v_2\'=\\dfrac{2m_1}{m_1+m_2}v_1',
    params: [
      { key: 'm1', label: 'm₁', unit: 'kg', min: 0.5, max: 5, step: 0.1, val: 2, color: '#ef4444' },
      { key: 'm2', label: 'm₂', unit: 'kg', min: 0.5, max: 5, step: 0.1, val: 1, color: '#6c8cff' },
      { key: 'v1', label: 'v₁', unit: 'm/s', min: 1, max: 15, step: 0.5, val: 5, color: '#f59e0b' },
      { key: 'v2', label: 'v₂', unit: 'm/s', min: -10, max: 0, step: 0.5, val: 0, color: '#34d399' }
    ],
    theory: `<div class="theory-title">📖 Lý thuyết</div>
      <p>Va chạm đàn hồi hoàn toàn bảo toàn cả <b>động lượng</b> và <b>động năng</b>.</p>
      <p class="formula-label">Bảo toàn động lượng:</p>
      <div class="formula">m₁v₁ + m₂v₂ = m₁v₁' + m₂v₂'</div>
      <p class="formula-label">Bảo toàn động năng:</p>
      <div class="formula">½m₁v₁² + ½m₂v₂² = ½m₁v₁'² + ½m₂v₂'²</div>
      <p>Khi <b>m₁ = m₂</b>: trao đổi vận tốc hoàn toàn.<br>Khi <b>m₁ ≫ m₂</b>: m₁ gần như không đổi, m₂ bật ra với 2v₁.</p>`
  },
  gas: {
    title: 'Khí lý tưởng',
    subtitle: 'Maxwell-Boltzmann – va chạm đàn hồi giữa các phân tử',
    latex: 'PV = nRT \\quad v_{rms} = \\sqrt{\\dfrac{3RT}{M}}',
    params: [
      { key: 'gT', label: 'T', unit: 'K', min: 100, max: 800, step: 5, val: 300, color: '#ef4444' },
      { key: 'gV', label: 'V', unit: 'L', min: 5, max: 50, step: 1, val: 22, color: '#6c8cff' },
      { key: 'gn', label: 'n', unit: 'mol', min: 0.5, max: 3, step: 0.1, val: 1, color: '#34d399' }
    ],
    theory: `<div class="theory-title">📖 Lý thuyết</div>
      <p class="formula-label">Phương trình trạng thái khí lý tưởng:</p>
      <div class="formula">PV = nRT</div>
      <p>Với R = 8.314 J/(mol·K) = 0.0821 atm·L/(mol·K).</p>
      <p class="formula-label">Tốc độ căn quân phương:</p>
      <div class="formula">v_rms = √(3RT / M)</div>
      <p>Tốc độ trung bình tỉ lệ <b>√T</b>. Hạt được khởi tạo theo phân bố <b>Maxwell-Boltzmann</b> (Box-Muller 2D), va chạm tường tạo áp suất.</p>`
  },
  carnot: {
    title: 'Chu trình Carnot',
    subtitle: 'Đồ thị P-V thực – đẳng nhiệt & đoạn nhiệt (γ=5/3)',
    latex: '\\eta_{Carnot} = 1 - \\dfrac{T_C}{T_H}',
    params: [
      { key: 'T1', label: 'T<sub>H</sub>', unit: 'K', min: 300, max: 1200, step: 10, val: 600, color: '#ef4444' },
      { key: 'T2', label: 'T<sub>C</sub>', unit: 'K', min: 100, max: 590, step: 10, val: 200, color: '#6c8cff' }
    ],
    theory: `<div class="theory-title">📖 Lý thuyết</div>
      <p>Chu trình Carnot gồm <b>4 quá trình</b> thuận nghịch:</p>
      <div class="theory-steps">
        <div class="theory-step"><span class="step-num">1→2</span> Giãn nở <b>đẳng nhiệt</b> ở T<sub>H</sub> (hấp thụ Q<sub>H</sub>)</div>
        <div class="theory-step"><span class="step-num">2→3</span> Giãn nở <b>đoạn nhiệt</b> (PV<sup>γ</sup> = const)</div>
        <div class="theory-step"><span class="step-num">3→4</span> Nén <b>đẳng nhiệt</b> ở T<sub>C</sub> (thải Q<sub>C</sub>)</div>
        <div class="theory-step"><span class="step-num">4→1</span> Nén <b>đoạn nhiệt</b></div>
      </div>
      <p class="formula-label">Hiệu suất Carnot:</p>
      <div class="formula">η = 1 − T<sub>C</sub> / T<sub>H</sub></div>
      <p>Đây là <b>giới hạn trên</b> cho hiệu suất mọi động cơ nhiệt.</p>`
  }
};

// ── State ──
let currentExp = 'projectile';
let running = true;
let animId = null;
let p = {};
let lastTs = null;
let simSpeed = 1;

let proj = {}, pend = {}, coll = {}, gasState = {}, carnotT = 0;
let vfxParticles = [];

// ── Colors (Premium Neon Dark Theme) ──
const C = {
  bg: '#05070A', bg2: '#0B0E14', grid: 'rgba(255,255,255,.05)',
  ground: 'rgba(0, 255, 102, 0.05)', groundLine: '#00FF66',
  text: '#FFFFFF', muted: '#A0AABF', border: 'rgba(0, 240, 255, 0.3)',
  blue: '#00F0FF', blue2: '#7C5CFC', blueGlow: 'rgba(0, 240, 255, 0.5)',
  red: '#FF007F', orange: '#FFEA00', green: '#00FF66',
  pink: '#FF007F', cyan: '#00F0FF', yellow: '#FFEA00',
  lavender: '#7C5CFC', peach: '#FF3366', mint: '#00FF66', sky: '#00F0FF',
  trail: 'rgba(0, 240, 255, 0.8)', trailFade: 'rgba(0, 240, 255, 0.1)'
};

// ── DOM ──
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const eqBox = document.getElementById('equationBox');
const pList = document.getElementById('paramsList');
const sBox = document.getElementById('statsBox') || document.querySelector('.stats-box');
const tBox = document.getElementById('theoryBox');
const btnPause = document.getElementById('btnPause');
const btnReset = document.getElementById('btnReset');
const speedSl = document.getElementById('speedSlider');
const speedVal = document.getElementById('speedValue');

function resizeCanvas() {
  const vp = canvas.parentElement;
  const w = vp.clientWidth;
  const h = vp.clientHeight;
  if (w > 0 && h > 0) {
    canvas.width = Math.floor(w);
    canvas.height = Math.floor(h);
  }
}

// ── Speed Control ──
speedSl.addEventListener('input', () => {
  simSpeed = +speedSl.value;
  speedVal.textContent = simSpeed.toFixed(1) + '×';
});

// ── UI Render ──
const expIcons = { projectile: '🎯', pendulum: '🕐', collision: '💥', gas: '🫧', carnot: '♨️' };
function renderUI() {
  const exp = EXPERIMENTS[currentExp];
  const icon = expIcons[currentExp] || '🔬';
  document.getElementById('expTitle').innerHTML = `<span class="title-icon">${icon}</span> ${exp.title}`;
  document.getElementById('expSubtitle').textContent = exp.subtitle;
  const monTitle = document.getElementById('monitorTitle');
  if (monTitle) monTitle.textContent = `🔬 ${exp.title}`;
  katex.render(exp.latex, eqBox, { throwOnError: false, displayMode: true });
  tBox.innerHTML = exp.theory || '';
  // Append the verification comparison panel
  tBox.innerHTML += buildVerificationPanel();

  pList.innerHTML = '';
  exp.params.forEach(pr => {
    p[pr.key] = p[pr.key] ?? pr.val;
    const row = document.createElement('div');
    row.className = 'param-row';
    row.innerHTML = `
      <div class="param-header">
        <span class="param-label" style="color:${pr.color}">${pr.label}</span>
        <span class="param-value" style="color:${pr.color}" id="val-${pr.key}">${(+p[pr.key]).toFixed(1)}</span>
        <span class="param-unit">${pr.unit}</span>
      </div>
      <input type="range" id="sl-${pr.key}" min="${pr.min}" max="${pr.max}" step="${pr.step}" value="${p[pr.key]}">
    `;
    pList.appendChild(row);
    row.querySelector(`#sl-${pr.key}`).addEventListener('input', e => {
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
  const stats = getStats();
  sBox.innerHTML = '';
  stats.forEach((s, i) => {
    const row = document.createElement('div');
    row.className = 'stat-row';
    row.style.animationDelay = (i * 0.03) + 's';
    row.innerHTML = `<span class="stat-label">${s.label}</span><span class="stat-value">${s.value}</span>`;
    sBox.appendChild(row);
  });
}

// ── Stats ──
function getStats() {
  if (currentExp === 'projectile') {
    const a = p.angle * Math.PI / 180, v = p.v0, g = p.gravity;
    const R = v * v * Math.sin(2 * a) / g;
    const H = v * v * Math.sin(a) ** 2 / (2 * g);
    const T = 2 * v * Math.sin(a) / g;
    return [
      { label: 'Tầm xa R', value: R.toFixed(2) + ' m' },
      { label: 'Độ cao cực đại H', value: H.toFixed(2) + ' m' },
      { label: 'Thời gian bay T', value: T.toFixed(3) + ' s' },
      { label: 'v₀ₓ = v₀cos(α)', value: (v * Math.cos(a)).toFixed(2) + ' m/s' },
      { label: 'v₀ᵧ = v₀sin(α)', value: (v * Math.sin(a)).toFixed(2) + ' m/s' },
      { label: 't hiện tại', value: (proj.t || 0).toFixed(2) + ' s' }
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
      { label: 'T (góc nhỏ)', value: T0.toFixed(4) + ' s' },
      { label: 'T (bậc 4)', value: T2.toFixed(4) + ' s' },
      { label: 'θ hiện tại', value: ((pend.theta || 0) * 180 / Math.PI).toFixed(1) + '°' },
      { label: 'ω hiện tại', value: (pend.omega || 0).toFixed(3) + ' rad/s' },
      { label: 'E<sub>K</sub> / E<sub>tổng</sub>', value: (E_kin / Math.max(E_total, 1e-9) * 100).toFixed(1) + '%' },
      { label: 'E<sub>U</sub> / E<sub>tổng</sub>', value: (E_pot / Math.max(E_total, 1e-9) * 100).toFixed(1) + '%' }
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
      { label: "v₁' (sau)", value: v1f.toFixed(3) + ' m/s' },
      { label: "v₂' (sau)", value: v2f.toFixed(3) + ' m/s' },
      { label: 'p trước', value: pi.toFixed(3) + ' kg·m/s' },
      { label: 'p sau', value: pf.toFixed(3) + ' kg·m/s' },
      { label: 'KE trước', value: KEi.toFixed(3) + ' J' },
      { label: 'KE sau', value: KEf.toFixed(3) + ' J' }
    ];
  }
  if (currentExp === 'gas') {
    const R_gas = 0.0821, T = p.gT, V = p.gV, n = p.gn;
    const P = n * R_gas * T / V;
    const M = 0.029;
    const vrms = Math.sqrt(3 * 8.314 * T / M);
    return [
      { label: 'Áp suất P', value: P.toFixed(4) + ' atm' },
      { label: 'nRT', value: (n * R_gas * T).toFixed(2) + ' atm·L' },
      { label: 'v<sub>rms</sub>', value: vrms.toFixed(0) + ' m/s' },
      { label: 'E<sub>K</sub> trung bình', value: (1.5 * 1.381e-23 * T * 1e23).toFixed(2) + ' ×10⁻²³ J' }
    ];
  }
  if (currentExp === 'carnot') {
    const T1 = p.T1, T2 = p.T2;
    if (T2 >= T1) return [{ label: '⚠ Cần T<sub>C</sub> < T<sub>H</sub>', value: '' }];
    const eta = (1 - T2 / T1) * 100;
    const W_net = 'nR·(T<sub>H</sub>−T<sub>C</sub>)·ln(V₂/V₁)';
    return [
      { label: 'Hiệu suất η', value: eta.toFixed(2) + '%' },
      { label: 'T<sub>H</sub> − T<sub>C</sub>', value: (T1 - T2) + ' K' },
      { label: 'W<sub>net</sub>', value: W_net },
      { label: 'COP (làm lạnh)', value: (T2 / (T1 - T2)).toFixed(2) }
    ];
  }
  return [];
}

// ═══════════════════════════════════════════════════
// VERIFICATION – Theory vs Simulation Comparison
// ═══════════════════════════════════════════════════

function buildVerificationPanel() {
  return `
    <div class="verify-panel" id="verifyPanel">
      <div class="verify-header">
        <span class="verify-icon">🔍</span>
        <span class="verify-title">Kiểm chứng lý thuyết</span>
      </div>
      <div class="verify-body" id="verifyBody">
        <div class="verify-loading">Đang thu thập dữ liệu mô phỏng…</div>
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

      rows.push(makeVerifyRow('Tầm xa R', R_th.toFixed(2) + ' m', landed ? R_th.toFixed(2) + ' m' : x_sim.toFixed(2) + ' m', landed ? 0 : errR, 'R = v₀²·sin(2α) / g'));
      rows.push(makeVerifyRow('Độ cao max H', H_th.toFixed(2) + ' m', simH.toFixed(2) + ' m', H_th > 0 ? Math.abs(simH - H_th) / H_th * 100 : 0, 'H = v₀²·sin²α / (2g)'));
      rows.push(makeVerifyRow('Thời gian bay T', T_th.toFixed(3) + ' s', t.toFixed(3) + ' s', T_th > 0 ? Math.abs(t - T_th) / T_th * 100 : 0, 'T = 2v₀·sinα / g'));
      rows.push(makeProgressBar('Tiến trình bay', progress));
    }

    else if (currentExp === 'pendulum' && pend && pend.theta !== undefined) {
      const L = p.length || 1.5, g = p.gravity || 9.8;
      const th0 = (p.amplitude || 45) * Math.PI / 180;
      const T_simple = 2 * Math.PI * Math.sqrt(L / g);
      const T_corr = T_simple * (1 + th0 * th0 / 16 + 11 * Math.pow(th0, 4) / 3072);
      const E_total = g * L * (1 - Math.cos(th0));
      const omega = pend.omega || 0;
      const theta = pend.theta || 0;
      const E_kin = 0.5 * L * L * omega * omega;
      const E_pot = g * L * (1 - Math.cos(theta));
      const E_sum = E_kin + E_pot;
      const E_err = E_total > 1e-9 ? Math.abs(E_sum - E_total) / E_total * 100 : 0;

      rows.push(makeVerifyRow('Chu kỳ T₀ (góc nhỏ)', T_simple.toFixed(4) + ' s', '—', null, 'T₀ = 2π√(L/g)'));
      rows.push(makeVerifyRow('Chu kỳ T (hiệu chỉnh)', T_corr.toFixed(4) + ' s', '—', null, 'Bậc 4 xấp xỉ'));
      rows.push(makeVerifyRow('Bảo toàn năng lượng', E_total.toFixed(4) + ' J', E_sum.toFixed(4) + ' J', E_err, 'E = Eₖ + Eₜ = const'));
      rows.push(makeProgressBar('Bảo toàn E (%)', Math.max(0, 1 - E_err / 5)));
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

      rows.push(makeVerifyRow('Động lượng p (trước)', pi.toFixed(3) + ' kg·m/s', pf.toFixed(3) + ' kg·m/s', pErr, 'Σmv = const'));
      rows.push(makeVerifyRow('Động năng KE', KEi.toFixed(3) + ' J', KEf.toFixed(3) + ' J', keErr, '½Σmv² = const'));
      rows.push(makeVerifyRow("v₁' (sau va chạm)", v1f.toFixed(3) + ' m/s', '—', null, '(m₁−m₂)v₁/(m₁+m₂)'));
      rows.push(makeVerifyRow("v₂' (sau va chạm)", v2f.toFixed(3) + ' m/s', '—', null, '2m₁v₁/(m₁+m₂)'));
    }

    else if (currentExp === 'gas' && p.gT) {
      const R_gas = 0.0821, T = p.gT, V = p.gV || 22, n = p.gn || 1;
      const P_th = n * R_gas * T / V;
      const M = 0.029;
      const vrms_th = Math.sqrt(3 * 8.314 * T / M);
      let vrms_sim = 0;
      if (gasState && gasState.particles && gasState.particles.length > 0) {
        let sumV2 = 0;
        for (let i = 0; i < gasState.particles.length; i++) {
          const pt = gasState.particles[i];
          sumV2 += pt.vx * pt.vx + pt.vy * pt.vy;
        }
        vrms_sim = Math.sqrt(sumV2 / gasState.particles.length);
      }

      const expected_sim_vrms = Math.sqrt(2) * 2.0 * Math.sqrt(T / 300);
      const velScale = vrms_th / expected_sim_vrms;
      const vrms_sim_ms = vrms_sim * velScale;
      const vrmsErr = Math.abs(vrms_sim_ms - vrms_th) / vrms_th * 100;

      rows.push(makeVerifyRow('Áp suất P', P_th.toFixed(4) + ' atm', '—', null, 'P = nRT / V'));
      rows.push(makeVerifyRow('v<sub>rms</sub>', vrms_th.toFixed(0) + ' m/s', vrms_sim_ms.toFixed(0) + ' m/s', vrmsErr, 'v = √(3RT/M)'));
      rows.push(makeVerifyRow('Eₖ trung bình', (1.5 * 1.381e-23 * T * 1e23).toFixed(2) + ' ×10⁻²³ J', '—', null, 'Eₖ = 3/2 · kT'));
    }

    else if (currentExp === 'carnot') {
      if (p.T1 && p.T2) {
        const T1 = Number(p.T1), T2 = Number(p.T2);
        if (T2 < T1) {
          const eta = (1 - T2 / T1) * 100;
          const cop = T2 / (T1 - T2);
          rows.push(makeVerifyRow('Hiệu suất Carnot η', eta.toFixed(2) + ' %', '—', null, 'η = 1 − T<sub>C</sub> / T<sub>H</sub>'));
          rows.push(makeVerifyRow('COP (làm lạnh)', cop.toFixed(2), '—', null, 'COP = T<sub>C</sub> / (T<sub>H</sub> − T<sub>C</sub>)'));
          rows.push(makeVerifyRow('Chênh lệch ΔT', (T1 - T2) + ' K', '—', null, 'ΔT = T<sub>H</sub> − T<sub>C</sub>'));
        }
      }
    }
  } catch (e) {
    console.error('[Verification Error]', e);
  }

  if (rows.length === 0) {
    body.innerHTML = '<div class="verify-loading">Đang thu thập dữ liệu…</div>';
    return;
  }
  body.innerHTML = rows.join('');
}

function makeVerifyRow(label, theoryVal, simVal, errorPct, formula) {
  const hasError = errorPct !== null && errorPct !== undefined && simVal !== '—';
  let badgeHTML = '';
  if (hasError) {
    const errClass = errorPct < 1 ? 'verify-excellent' : errorPct < 5 ? 'verify-good' : 'verify-warn';
    const errIcon = errorPct < 1 ? '✅' : errorPct < 5 ? '🟢' : '🔴';
    const errText = errorPct < 1 ? 'Chính xác' : errorPct < 5 ? 'Khớp tốt' : 'Sai lệch';
    badgeHTML = `<span class="verify-badge ${errClass}">${errIcon} ${errText} (${errorPct.toFixed(1)}%)</span>`;
  }
  return `
    <div class="verify-row">
      <div class="verify-row-header">
        <span class="verify-label">${label}</span>
        ${badgeHTML}
      </div>
      <div class="verify-values">
        <div class="verify-col">
          <span class="verify-col-label">📐 Lý thuyết</span>
          <span class="verify-col-value">${theoryVal}</span>
        </div>
        ${simVal !== '—' ? `
        <div class="verify-col">
          <span class="verify-col-label">🎯 Mô phỏng</span>
          <span class="verify-col-value">${simVal}</span>
        </div>` : ''}
      </div>
      <div class="verify-formula">${formula}</div>
    </div>`;
}

function makeProgressBar(label, ratio) {
  const pct = Math.max(0, Math.min(100, ratio * 100));
  const barColor = pct > 90 ? '#2ED573' : pct > 50 ? '#FECA57' : '#FF6B6B';
  return `
    <div class="verify-progress">
      <div class="verify-progress-label">${label}: ${pct.toFixed(0)}%</div>
      <div class="verify-progress-track">
        <div class="verify-progress-fill" style="width:${pct}%;background:${barColor}"></div>
      </div>
    </div>`;
}

// ═══════════════════════════════════════════════════
// PHYSICS ENGINE
// ═══════════════════════════════════════════════════

// ── RK4 Integrator ──
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

// ── Maxwell-Boltzmann 2D (Box-Muller) ──
function sampleMB(sigma) {
  const u1 = Math.max(1e-10, Math.random()), u2 = Math.random();
  return {
    vx: sigma * Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2),
    vy: sigma * Math.sqrt(-2 * Math.log(u1)) * Math.sin(2 * Math.PI * u2)
  };
}

// ── Init Physics ──
function initPhysics() {
  resizeCanvas();
  const W = canvas.width, H = canvas.height;

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
  if (currentExp === 'pendulum') {
    const th0 = (p.amplitude ?? 45) * Math.PI / 180;
    pend = { theta: th0, omega: 0, trail: [], thetaHistory: [] };
  }
  if (currentExp === 'collision') {
    const m1 = p.m1, m2 = p.m2, v1i = p.v1, v2i = p.v2 || 0;
    const v1f = ((m1 - m2) * v1i + 2 * m2 * v2i) / (m1 + m2);
    const v2f = ((m2 - m1) * v2i + 2 * m1 * v1i) / (m1 + m2);
    const r1 = 12 + m1 * 7, r2 = 12 + m2 * 7;
    const maxV = Math.max(Math.abs(v1i), Math.abs(v2i), Math.abs(v1f), Math.abs(v2f), 1);
    const VEL = 2.5; // px per (m/s) per frame at 60fps
    coll = {
      x1: r1 + 30, x2: W / 2 + 80,
      r1, r2, v1i, v2i, v1f, v2f,
      by: H - 80, velScale: VEL,
      phase: 'approach', postTimer: 0, flash: 0
    };
  }
  if (currentExp === 'gas') initGas();
  if (currentExp === 'carnot') carnotT = 0;
}

function gasBox() {
  const W = canvas.width, H = canvas.height, V = p.gV || 22;
  const side = Math.max(100, Math.min(260, 200 * Math.sqrt(V / 22)));
  const cx = W / 2, cy = H / 2;
  return { cx, side, topY: cy - side / 2, botY: cy + side / 2, leftX: cx - side / 2, rightX: cx + side / 2 };
}

function initGas() {
  const { cx, side, topY, botY, leftX, rightX } = gasBox();
  const T = p.gT || 300;
  const sigma = 2.0 * Math.sqrt(T / 300);
  gasState = { particles: [], wallHits: 0 };
  for (let i = 0; i < 80; i++) {
    const { vx, vy } = sampleMB(sigma);
    gasState.particles.push({
      x: leftX + 10 + Math.random() * (side - 20),
      y: topY + 10 + Math.random() * (side - 20),
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

// ═══════════════════════════════════════════════════
// DRAWING
// ═══════════════════════════════════════════════════

function drawGrid() {
  const W = canvas.width, H = canvas.height;
  // Neon sleek grid
  ctx.fillStyle = 'rgba(255,255,255,.03)';
  for (let x = 0; x < W; x += 40) for (let y = 0; y < H; y += 40) {
    ctx.fillRect(x, y, 1, 1);
  }
}

// ── PROJECTILE (Analytical trajectory) ──
function drawProjectile(dt) {
  const W = canvas.width, H = canvas.height;
  ctx.fillStyle = C.bg; ctx.fillRect(0, 0, W, H);
  drawGrid();

  const { vx, vy, g, scale, ox, oy, Tf, R, Hmax } = proj;

  // Đất với gradient tối (neon style)
  const grd = ctx.createLinearGradient(0, oy, 0, H);
  grd.addColorStop(0, 'rgba(0, 255, 102, 0.1)'); grd.addColorStop(1, 'rgba(0, 255, 102, 0.0)');
  ctx.fillStyle = grd; ctx.fillRect(0, oy, W, H - oy);
  ctx.strokeStyle = C.border; ctx.lineWidth = 2.5;
  ctx.beginPath(); ctx.moveTo(0, oy); ctx.lineTo(W, oy); ctx.stroke();

  // Trục tọa độ
  ctx.strokeStyle = 'rgba(45,43,61,.2)'; ctx.lineWidth = 1.5;
  ctx.setLineDash([4, 4]);
  ctx.beginPath(); ctx.moveTo(ox, oy); ctx.lineTo(ox, 30); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(ox, oy); ctx.lineTo(W - 20, oy); ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle = C.muted; ctx.font = 'bold 14px Inter';
  ctx.textAlign = 'center'; ctx.fillText('x', W - 15, oy + 18);
  ctx.fillText('y', ox - 14, 30);

  // Quỹ đạo lý thuyết (parabol đầy đủ)
  ctx.beginPath(); ctx.setLineDash([5, 4]);
  ctx.strokeStyle = 'rgba(84,160,255,.35)'; ctx.lineWidth = 2;
  for (let i = 0; i <= 100; i++) {
    const tt = (i / 100) * Tf;
    const px = ox + vx * tt * scale;
    const py = oy - (vy * tt - .5 * g * tt * tt) * scale;
    i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
  }
  ctx.stroke(); ctx.setLineDash([]);

  // Đánh dấu H_max và R
  const hx = ox + vx * (Tf / 2) * scale, hy = oy - Hmax * scale;
  ctx.setLineDash([3, 4]); ctx.strokeStyle = 'rgba(245,158,11,.4)'; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(hx, hy); ctx.lineTo(hx, oy); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(ox, hy); ctx.lineTo(hx, hy); ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle = C.orange; ctx.font = 'bold 14px Inter'; ctx.textAlign = 'right';
  ctx.fillText('H=' + Hmax.toFixed(1) + 'm', ox - 6, hy + 5);
  const rx = ox + R * scale;
  ctx.fillStyle = C.green; ctx.textAlign = 'center';
  ctx.fillText('R=' + R.toFixed(1) + 'm', rx, oy + 20);

  // Cập nhật t
  if (running) {
    proj.t += dt * simSpeed;
    if (proj.t > Tf) { 
      spawnParticles(ox + vx * Tf * scale, oy, C.orange, 30);
      
      const new_vy = vy * 0.7;
      const new_vx = vx * 0.9;
      const new_Tf = 2 * new_vy / g;
      
      if (new_Tf < 0.2) {
        initPhysics();
      } else {
        proj.ox = ox + vx * Tf * scale;
        proj.vx = new_vx;
        proj.vy = new_vy;
        proj.Tf = new_Tf;
        proj.t = 0;
        proj.R = new_vx * new_Tf;
        proj.Hmax = (new_vy * new_vy) / (2 * g);
      }
    }
  }
  const t = proj.t;
  const bx = ox + vx * t * scale;
  const by = oy - (vy * t - .5 * g * t * t) * scale;
  proj.trail.push({ x: bx, y: by, t });
  if (proj.trail.length > 300) proj.trail.shift();

  // Trail glow
  if (proj.trail.length > 1) {
    ctx.beginPath();
    proj.trail.forEach((pt, i) => {
      ctx.globalAlpha = (i / proj.trail.length) * .5;
      i === 0 ? ctx.moveTo(pt.x, pt.y) : ctx.lineTo(pt.x, pt.y);
    });
    ctx.strokeStyle = C.blue; ctx.lineWidth = 2.5; ctx.stroke();
    ctx.globalAlpha = 1;
  }

  // Velocity vector
  const curVx = vx, curVy = vy - g * t;
  const vScale = 1.8;
  ctx.strokeStyle = C.orange; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(bx, by);
  ctx.lineTo(bx + curVx * vScale, by - curVy * vScale); ctx.stroke();
  // arrowhead
  const angle = Math.atan2(-curVy, curVx);
  ctx.fillStyle = C.orange;
  ctx.beginPath();
  ctx.moveTo(bx + curVx * vScale, by - curVy * vScale);
  ctx.lineTo(bx + curVx * vScale - 8 * Math.cos(angle - 0.4), by - curVy * vScale + 8 * Math.sin(angle - 0.4));
  ctx.lineTo(bx + curVx * vScale - 8 * Math.cos(angle + 0.4), by - curVy * vScale + 8 * Math.sin(angle + 0.4));
  ctx.fill();

  // Ball – cartoon style with thick outline
  ctx.shadowColor = 'rgba(0,0,0,.1)'; ctx.shadowBlur = 8; ctx.shadowOffsetX = 3; ctx.shadowOffsetY = 3;
  const ballGrad = ctx.createRadialGradient(bx - 4, by - 4, 2, bx, by, 14);
  ballGrad.addColorStop(0, '#B8E0FF'); ballGrad.addColorStop(1, C.blue);
  ctx.beginPath(); ctx.fillStyle = ballGrad;
  ctx.arc(bx, by, 14, 0, Math.PI * 2); ctx.fill();
  ctx.shadowBlur = 0; ctx.shadowOffsetX = 0; ctx.shadowOffsetY = 0;
  // Thick outline
  ctx.strokeStyle = C.border; ctx.lineWidth = 2.5;
  ctx.beginPath(); ctx.arc(bx, by, 14, 0, Math.PI * 2); ctx.stroke();
  // Cute highlight
  ctx.fillStyle = 'rgba(255,255,255,.5)'; ctx.beginPath();
  ctx.arc(bx - 5, by - 5, 4, 0, Math.PI * 2); ctx.fill();

  // Time label
  ctx.fillStyle = C.text; ctx.font = 'bold 16px Inter'; ctx.textAlign = 'left';
  ctx.fillText(`t = ${t.toFixed(2)} s`, ox + 6, 24);
  ctx.fillStyle = C.muted; ctx.font = '14px Inter';
  ctx.fillText(`v = ${Math.sqrt(curVx ** 2 + curVy ** 2).toFixed(1)} m/s`, ox + 6, 42);
}

// ── PENDULUM (RK4) ──
function drawPendulum(dt) {
  const W = canvas.width, H = canvas.height;
  ctx.fillStyle = C.bg; ctx.fillRect(0, 0, W, H); drawGrid();

  const L = p.length || 1.5, g = p.gravity || 9.8;
  const STEPS = 12;
  if (running) {
    const subDt = dt * simSpeed / STEPS;
    for (let i = 0; i < STEPS; i++) {
      const res = rk4Step(pend.theta, pend.omega, subDt, g, L);
      pend.theta = res.theta; pend.omega = res.omega;
    }
    pend.thetaHistory = pend.thetaHistory || [];
    pend.thetaHistory.push(pend.theta);
    if (pend.thetaHistory.length > 200) pend.thetaHistory.shift();
  }

  const cx = W / 2, cy = 100;
  const pxL = Math.min(L * 130, H - 170);
  const bx = cx + Math.sin(pend.theta) * pxL;
  const by = cy + Math.cos(pend.theta) * pxL;

  // Vạch vị trí cân bằng
  ctx.setLineDash([3, 5]); ctx.strokeStyle = 'rgba(45,43,61,.12)'; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx, cy + pxL); ctx.stroke();
  ctx.setLineDash([]);

  // Vạch biên độ
  const th0 = (p.amplitude ?? 45) * Math.PI / 180;
  ctx.setLineDash([3, 5]); ctx.strokeStyle = 'rgba(245,158,11,.25)'; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(cx, cy);
  ctx.lineTo(cx + Math.sin(th0) * pxL, cy + Math.cos(th0) * pxL); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(cx, cy);
  ctx.lineTo(cx - Math.sin(th0) * pxL, cy + Math.cos(th0) * pxL); ctx.stroke();
  ctx.setLineDash([]);

  // Arc hiển thị góc
  ctx.beginPath(); ctx.strokeStyle = 'rgba(84,160,255,.45)'; ctx.lineWidth = 2;
  const arcR = 50;
  if (pend.theta >= 0) {
    ctx.arc(cx, cy, arcR, Math.PI / 2, Math.PI / 2 - pend.theta, true);
  } else {
    ctx.arc(cx, cy, arcR, Math.PI / 2, Math.PI / 2 - pend.theta, false);
  }
  ctx.stroke();
  ctx.fillStyle = C.blue; ctx.font = 'bold 16px Inter'; ctx.textAlign = 'center';
  ctx.fillText(`${(pend.theta * 180 / Math.PI).toFixed(1)}°`, cx + Math.sin(pend.theta / 2) * 65, cy + Math.cos(pend.theta / 2) * 65);

  // Trail (afterimage)
  pend.trail = pend.trail || [];
  pend.trail.push({ x: bx, y: by });
  if (pend.trail.length > 80) pend.trail.shift();
  pend.trail.forEach((pt, i) => {
    ctx.globalAlpha = (i / pend.trail.length) * 0.15;
    ctx.beginPath(); ctx.fillStyle = C.blue;
    ctx.arc(pt.x, pt.y, 16, 0, Math.PI * 2); ctx.fill();
  });
  ctx.globalAlpha = 1;

  // Giá đỡ (neon style)
  ctx.fillStyle = 'rgba(124, 92, 252, 0.2)';
  ctx.fillRect(cx - 40, 0, 80, cy);
  ctx.strokeStyle = C.border; ctx.lineWidth = 2.5;
  ctx.strokeRect(cx - 40, 0, 80, cy);
  ctx.fillStyle = 'rgba(124, 92, 252, 0.4)'; ctx.fillRect(cx - 48, cy - 4, 96, 8);
  ctx.strokeStyle = C.border; ctx.lineWidth = 2;
  ctx.strokeRect(cx - 48, cy - 4, 96, 8);
  ctx.fillStyle = '#FFD93D'; ctx.beginPath(); ctx.arc(cx, cy, 7, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = C.border; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.arc(cx, cy, 7, 0, Math.PI * 2); ctx.stroke();

  // Dây — thick cartoon rope
  ctx.strokeStyle = C.border; ctx.lineWidth = 4;
  ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(bx, by); ctx.stroke();
  ctx.strokeStyle = '#8B7EC8'; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(bx, by); ctx.stroke();

  // Quả lắc – cartoon style
  ctx.shadowColor = 'rgba(0,0,0,.12)'; ctx.shadowBlur = 6; ctx.shadowOffsetX = 3; ctx.shadowOffsetY = 3;
  const gr = ctx.createRadialGradient(bx - 6, by - 6, 3, bx, by, 24);
  gr.addColorStop(0, '#B8E0FF'); gr.addColorStop(1, C.blue);
  ctx.beginPath(); ctx.fillStyle = gr; ctx.arc(bx, by, 24, 0, Math.PI * 2); ctx.fill();
  ctx.shadowBlur = 0; ctx.shadowOffsetX = 0; ctx.shadowOffsetY = 0;
  // Thick outline
  ctx.strokeStyle = C.border; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.arc(bx, by, 24, 0, Math.PI * 2); ctx.stroke();
  // Cute highlight
  ctx.fillStyle = 'rgba(255,255,255,.45)'; ctx.beginPath();
  ctx.arc(bx - 8, by - 8, 7, 0, Math.PI * 2); ctx.fill();

  // Energy bar
  const E_total = g * L * (1 - Math.cos(th0));
  const E_kin = 0.5 * L * L * pend.omega * pend.omega;
  const E_pot = g * L * (1 - Math.cos(pend.theta));
  const barW = 160, barX = W - barW - 24, barY = 22, barH = 12;
  ctx.fillStyle = 'rgba(255, 255, 255, 0.05)'; ctx.fillRect(barX, barY, barW, barH * 2 + 4);
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)'; ctx.lineWidth = 1.5;
  ctx.strokeRect(barX, barY, barW, barH * 2 + 4);
  const kinW = barW * Math.min(E_kin / Math.max(E_total, 1e-9), 1);
  const potW = barW * Math.min(E_pot / Math.max(E_total, 1e-9), 1);
  ctx.fillStyle = C.blue; ctx.fillRect(barX, barY, kinW, barH);
  ctx.fillStyle = C.orange; ctx.fillRect(barX, barY + barH + 4, potW, barH);
  ctx.fillStyle = C.text; ctx.font = 'bold 13px Inter'; ctx.textAlign = 'right';
  ctx.fillText('Eₖ (động năng)', barX - 6, barY + 10);
  ctx.fillText('Eₜ (thế năng)', barX - 6, barY + barH + 14);

  // θ-t graph (mini)
  if (pend.thetaHistory && pend.thetaHistory.length > 2) {
    const gx = 20, gy = H - 100, gw = 180, gh = 70;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.fillRect(gx, gy, gw, gh);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)'; ctx.lineWidth = 1.5;
    ctx.strokeRect(gx, gy, gw, gh);
    // Vẽ đường θ(t)
    ctx.beginPath(); ctx.strokeStyle = C.blue; ctx.lineWidth = 2;
    const hist = pend.thetaHistory;
    hist.forEach((th, i) => {
      const hx = gx + (i / hist.length) * gw;
      const hy = gy + gh / 2 - (th / Math.max(th0, 0.1)) * gh / 2.2;
      i === 0 ? ctx.moveTo(hx, hy) : ctx.lineTo(hx, hy);
    });
    ctx.stroke();
    ctx.fillStyle = C.text; ctx.font = 'bold 14px Inter'; ctx.textAlign = 'left';
    ctx.fillText('θ(t)', gx + 6, gy - 6);
  }
}

// ── COLLISION (velocity-accurate) ──
function drawCollision() {
  const W = canvas.width, H = canvas.height;
  ctx.fillStyle = C.bg; ctx.fillRect(0, 0, W, H); drawGrid();

  // Floor (neon style)
  const floorY = H - 80;
  ctx.fillStyle = 'rgba(0, 255, 102, 0.05)'; ctx.fillRect(0, floorY, W, H - floorY);
  ctx.strokeStyle = C.border; ctx.lineWidth = 2.5;
  ctx.beginPath(); ctx.moveTo(0, floorY); ctx.lineTo(W, floorY); ctx.stroke();

  const { r1, r2, v1i, v2i, v1f, v2f, by, velScale } = coll;

  if (running) {
    if (coll.phase === 'approach') {
      coll.x1 += v1i * velScale;
      coll.x2 += v2i * velScale;
      if (coll.x1 + r1 >= coll.x2 - r2) {
        coll.x1 = coll.x2 - r1 - r2;
        coll.phase = 'post'; coll.postTimer = 0; coll.flash = 1;
        spawnParticles(coll.x1 + r1, coll.by - r1/2, C.cyan, 25);
        spawnParticles(coll.x2 - r2, coll.by - r2/2, C.red, 25);
      }
    } else {
      coll.x1 += v1f * velScale;
      coll.x2 += v2f * velScale;
      coll.postTimer++;
      if (coll.flash > 0) coll.flash -= 0.03;
      if (coll.postTimer > 150) {
        coll.x1 = r1 + 30; coll.x2 = W / 2 + 80;
        coll.phase = 'approach'; coll.flash = 0;
      }
    }
  }

  // Flash effect at collision
  if (coll.flash > 0) {
    const cx = (coll.x1 + coll.x2) / 2;
    const flashGrad = ctx.createRadialGradient(cx, by - r1, 0, cx, by - r1, 80);
    flashGrad.addColorStop(0, `rgba(255,255,255,${coll.flash * 0.5})`);
    flashGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = flashGrad;
    ctx.fillRect(0, 0, W, H);
  }

  const drawBall = (x, r, color, label, vel, mass) => {
    const yc = by - r;
    // Shadow
    ctx.fillStyle = 'rgba(0,0,0,.2)';
    ctx.beginPath(); ctx.ellipse(x, by + 3, r * .9, r * .25, 0, 0, Math.PI * 2); ctx.fill();
    // Ball — cartoon style
    ctx.shadowColor = 'rgba(0,0,0,.1)'; ctx.shadowBlur = 4; ctx.shadowOffsetX = 3; ctx.shadowOffsetY = 3;
    const gr = ctx.createRadialGradient(x - r / 3, yc - r / 3, r / 6, x, yc, r);
    gr.addColorStop(0, color + 'dd'); gr.addColorStop(1, color + '88');
    ctx.beginPath(); ctx.fillStyle = gr; ctx.arc(x, yc, r, 0, Math.PI * 2); ctx.fill();
    ctx.shadowBlur = 0; ctx.shadowOffsetX = 0; ctx.shadowOffsetY = 0;
    // Thick outline
    ctx.strokeStyle = C.border; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.arc(x, yc, r, 0, Math.PI * 2); ctx.stroke();
    // Highlight
    ctx.fillStyle = 'rgba(255,255,255,.4)'; ctx.beginPath();
    ctx.arc(x - r * .25, yc - r * .25, r * .3, 0, Math.PI * 2); ctx.fill();
    // Label
    ctx.fillStyle = '#fff'; ctx.font = `bold ${Math.max(r * .55, 14)}px Inter`;
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(label, x, yc);
    ctx.fillStyle = C.text; ctx.font = 'bold 13px Inter'; ctx.textBaseline = 'alphabetic';
    ctx.fillText(`${mass.toFixed(1)} kg`, x, yc + r + 18);

    // Velocity arrow
    if (Math.abs(vel) > 0.05) {
      const arrowLen = Math.min(Math.abs(vel) * 15, 120) * Math.sign(vel);
      const ay = yc - r - 14;
      ctx.strokeStyle = color; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(x, ay); ctx.lineTo(x + arrowLen, ay); ctx.stroke();
      // Arrowhead
      const dir = Math.sign(vel);
      ctx.fillStyle = color; ctx.beginPath();
      ctx.moveTo(x + arrowLen, ay);
      ctx.lineTo(x + arrowLen - 8 * dir, ay - 4);
      ctx.lineTo(x + arrowLen - 8 * dir, ay + 4); ctx.fill();
      ctx.fillStyle = color; ctx.font = 'bold 14px Inter'; ctx.textAlign = 'center';
      ctx.fillText(`${vel.toFixed(1)} m/s`, x + arrowLen / 2, ay - 10);
    }
  };

  const curV1 = coll.phase === 'approach' ? v1i : v1f;
  const curV2 = coll.phase === 'approach' ? v2i : v2f;
  drawBall(coll.x1, r1, C.red, 'm₁', curV1, p.m1);
  drawBall(coll.x2, r2, C.blue, 'm₂', curV2, p.m2);

  // Phase label
  ctx.fillStyle = coll.phase === 'approach' ? C.text : C.green;
  ctx.font = 'bold 18px Inter'; ctx.textAlign = 'center';
  ctx.fillText(coll.phase === 'approach' ? '⏩ Trước va chạm' : '✓ Sau va chạm', W / 2, 28);

  // Momentum bar comparison
  const pi = p.m1 * v1i + p.m2 * (p.v2 || 0);
  const pf = p.m1 * v1f + p.m2 * v2f;
  ctx.fillStyle = C.muted; ctx.font = 'bold 14px Inter'; ctx.textAlign = 'left';
  ctx.fillText(`p = ${(coll.phase === 'approach' ? pi : pf).toFixed(2)} kg·m/s (bảo toàn)`, 14, H - 18);
}

// ── GAS (Maxwell-Boltzmann with inter-particle collisions) ──
function drawGas() {
  const W = canvas.width, H = canvas.height;
  ctx.fillStyle = C.bg; ctx.fillRect(0, 0, W, H);

  const { cx, side, topY, botY, leftX, rightX } = gasBox();
  const T = p.gT || 300, sigma = 2.0 * Math.sqrt(T / 300);

  if (running && gasState.particles) {
    gasState.wallHits = 0;
    gasState.particles.forEach(pt => {
      pt.x += pt.vx * simSpeed;
      pt.y += pt.vy * simSpeed;
      if (pt.x < leftX + 6) { pt.vx = Math.abs(pt.vx); pt.x = leftX + 6; gasState.wallHits++; }
      if (pt.x > rightX - 6) { pt.vx = -Math.abs(pt.vx); pt.x = rightX - 6; gasState.wallHits++; }
      if (pt.y < topY + 6) { pt.vy = Math.abs(pt.vy); pt.y = topY + 6; gasState.wallHits++; }
      if (pt.y > botY - 6) { pt.vy = -Math.abs(pt.vy); pt.y = botY - 6; gasState.wallHits++; }
    });
  }

  // Container – cartoon style with thick border
  ctx.fillStyle = 'rgba(184,224,255,.15)';
  ctx.fillRect(leftX, topY, side, side);
  ctx.strokeStyle = C.border; ctx.lineWidth = 3;
  ctx.strokeRect(leftX, topY, side, side);

  // Corner accents
  const cl = 14;
  ctx.strokeStyle = C.blue; ctx.lineWidth = 3;
  [[leftX, topY, 1, 1], [rightX, topY, -1, 1], [leftX, botY, 1, -1], [rightX, botY, -1, -1]].forEach(([x, y, dx, dy]) => {
    ctx.beginPath(); ctx.moveTo(x, y + cl * dy); ctx.lineTo(x, y); ctx.lineTo(x + cl * dx, y); ctx.stroke();
  });

  // Piston (cartoon style)
  ctx.fillStyle = 'rgba(124, 92, 252, 0.2)'; ctx.fillRect(leftX, topY - 16, side, 16);
  ctx.strokeStyle = C.border; ctx.lineWidth = 2;
  ctx.strokeRect(leftX, topY - 16, side, 16);
  ctx.fillStyle = 'rgba(124, 92, 252, 0.4)'; ctx.fillRect(cx - 10, topY - 40, 20, 24);
  ctx.strokeStyle = C.border; ctx.lineWidth = 2;
  ctx.strokeRect(cx - 10, topY - 40, 20, 24);
  ctx.fillStyle = '#FFD93D'; ctx.beginPath(); ctx.arc(cx, topY - 40, 7, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = C.border; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.arc(cx, topY - 40, 7, 0, Math.PI * 2); ctx.stroke();

  // Particles – color by speed
  if (gasState.particles) {
    gasState.particles.forEach(pt => {
      const spd = Math.sqrt(pt.vx ** 2 + pt.vy ** 2);
      const ratio = Math.min(spd / (sigma * 2.5), 1);
      // Blue → Yellow → Red
      let r, g, b;
      if (ratio < 0.5) {
        const t2 = ratio * 2;
        r = Math.round(108 + (245 - 108) * t2);
        g = Math.round(140 + (158 - 140) * t2);
        b = Math.round(255 + (11 - 255) * t2);
      } else {
        const t2 = (ratio - .5) * 2;
        r = Math.round(245 + (239 - 245) * t2);
        g = Math.round(158 + (68 - 158) * t2);
        b = Math.round(11 + (68 - 11) * t2);
      }
      ctx.shadowColor = `rgba(${r},${g},${b},.4)`; ctx.shadowBlur = 6;
      ctx.beginPath(); ctx.fillStyle = `rgb(${r},${g},${b})`;
      ctx.arc(pt.x, pt.y, 4, 0, Math.PI * 2); ctx.fill();
    });
    ctx.shadowBlur = 0;
  }

  // Labels
  const n = p.gn || 1, V = p.gV || 22;
  const P = (n * 0.0821 * T / V).toFixed(3);
  ctx.fillStyle = C.text; ctx.font = 'bold 16px Inter'; ctx.textAlign = 'left';
  const lx = rightX + 22, ly = topY + 24;
  ctx.fillText(`T = ${T} K`, lx, ly);
  ctx.fillText(`V = ${V} L`, lx, ly + 24);
  ctx.fillText(`n = ${n} mol`, lx, ly + 48);
  ctx.fillStyle = C.blue; ctx.font = 'bold 18px Inter';
  ctx.fillText(`P = ${P} atm`, lx, ly + 78);

  // Speed legend
  ctx.fillStyle = C.muted; ctx.font = 'bold 13px Inter'; ctx.textAlign = 'center';
  ctx.fillText('chậm → nhanh', cx, botY + 28);
  const legW = 100;
  for (let i = 0; i < legW; i++) {
    const ratio = i / legW;
    let lr, lg, lb;
    if (ratio < .5) { lr = Math.round(108 + (245 - 108) * ratio * 2); lg = Math.round(140 + (158 - 140) * ratio * 2); lb = Math.round(255 + (11 - 255) * ratio * 2); }
    else { const t2 = (ratio - .5) * 2; lr = Math.round(245 + (239 - 245) * t2); lg = Math.round(158 + (68 - 158) * t2); lb = Math.round(11 + (68 - 11) * t2); }
    ctx.fillStyle = `rgb(${lr},${lg},${lb})`;
    ctx.fillRect(cx - legW / 2 + i, botY + 34, 1, 6);
  }
}

// ── CARNOT (real P-V diagram) ──
function drawCarnot() {
  const W = canvas.width, H = canvas.height;
  ctx.fillStyle = C.bg; ctx.fillRect(0, 0, W, H);

  const T1 = p.T1 || 600, T2 = p.T2 || 200;
  if (T2 >= T1) {
    ctx.fillStyle = C.red; ctx.font = 'bold 20px Inter'; ctx.textAlign = 'center';
    ctx.fillText('⚠ Cần Tc < Th để có chu trình Carnot!', W / 2, H / 2);
    return;
  }

  const GAMMA = 5 / 3, n = 1, R_c = 1;
  const V1 = 1.0, V2 = 2.5;
  const exp1 = 1 / (GAMMA - 1);
  const V3 = V2 * Math.pow(T1 / T2, exp1);
  const V4 = V1 * Math.pow(T1 / T2, exp1);
  const PA = n * R_c * T1 / V1, PB = n * R_c * T1 / V2;
  const PC = n * R_c * T2 / V3, PD = n * R_c * T2 / V4;
  const C_BC = PB * Math.pow(V2, GAMMA), C_DA = PD * Math.pow(V4, GAMMA);

  const allV = [V1, V2, V3, V4], allP = [PA, PB, PC, PD];
  const Vmin = Math.min(...allV) * .8, Vmax = Math.max(...allV) * 1.15;
  const Pmin = Math.min(...allP) * .8, Pmax = Math.max(...allP) * 1.15;

  const ox = 90, oy = H - 65, pw = W - ox - 50, ph = oy - 60;
  const toX = v => ox + (v - Vmin) / (Vmax - Vmin) * pw;
  const toY = pp => oy - (pp - Pmin) / (Pmax - Pmin) * ph;

  // Axes
  ctx.strokeStyle = 'rgba(45,43,61,.25)'; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(ox, 50); ctx.lineTo(ox, oy); ctx.lineTo(W - 40, oy); ctx.stroke();
  // Arrow tips
  ctx.fillStyle = 'rgba(45,43,61,.25)';
  ctx.beginPath(); ctx.moveTo(ox, 50); ctx.lineTo(ox - 5, 60); ctx.lineTo(ox + 5, 60); ctx.fill();
  ctx.beginPath(); ctx.moveTo(W - 40, oy); ctx.lineTo(W - 50, oy - 5); ctx.lineTo(W - 50, oy + 5); ctx.fill();
  ctx.fillStyle = C.text; ctx.font = 'bold 15px Inter';
  ctx.textAlign = 'center'; ctx.fillText('V (m³)', W / 2, oy + 26);
  ctx.save(); ctx.translate(ox - 26, H / 2);
  ctx.rotate(-Math.PI / 2); ctx.fillText('P (Pa)', 0, 0);
  ctx.restore();

  // Fill cycle area
  ctx.beginPath(); ctx.globalAlpha = 0.06;
  const fillPts = [];
  for (let i = 0; i <= 40; i++) { const v = V1 + (V2 - V1) * i / 40; fillPts.push([toX(v), toY(n * R_c * T1 / v)]); }
  for (let i = 0; i <= 40; i++) { const v = V2 + (V3 - V2) * i / 40; fillPts.push([toX(v), toY(C_BC / Math.pow(v, GAMMA))]); }
  for (let i = 0; i <= 40; i++) { const v = V3 + (V4 - V3) * i / 40; fillPts.push([toX(v), toY(n * R_c * T2 / v)]); }
  for (let i = 0; i <= 40; i++) { const v = V4 + (V1 - V4) * i / 40; fillPts.push([toX(v), toY(C_DA / Math.pow(v, GAMMA))]); }
  ctx.moveTo(fillPts[0][0], fillPts[0][1]);
  fillPts.forEach(pt => ctx.lineTo(pt[0], pt[1]));
  ctx.closePath(); ctx.fillStyle = C.blue; ctx.fill();
  ctx.globalAlpha = 1;

  // Draw curves
  const drawCurve = (Vs, Ve, fn, color, lbl) => {
    ctx.beginPath(); ctx.strokeStyle = color; ctx.lineWidth = 3;
    for (let i = 0; i <= 60; i++) { const v = Vs + (Ve - Vs) * i / 60; const pp = fn(v); i === 0 ? ctx.moveTo(toX(v), toY(pp)) : ctx.lineTo(toX(v), toY(pp)); }
    ctx.stroke();
    if (lbl) { const vm = (Vs + Ve) / 2; ctx.fillStyle = color; ctx.font = 'bold 13px Inter'; ctx.textAlign = 'center'; ctx.fillText(lbl, toX(vm), toY(fn(vm)) - 14); }
  };

  drawCurve(V1, V2, v => n * R_c * T1 / v, C.red, `Đẳng nhiệt Th=${T1}K`);
  drawCurve(V2, V3, v => C_BC / Math.pow(v, GAMMA), '#8b8fa3', 'Đoạn nhiệt');
  drawCurve(V3, V4, v => n * R_c * T2 / v, C.blue, `Đẳng nhiệt Tc=${T2}K`);
  drawCurve(V4, V1, v => C_DA / Math.pow(v, GAMMA), '#8b8fa3', '');

  // State points
  [[V1, PA, 'A', C.red], [V2, PB, 'B', C.red], [V3, PC, 'C', C.blue], [V4, PD, 'D', C.blue]].forEach(([v, pp, lb, col]) => {
    ctx.shadowColor = 'rgba(0,0,0,.1)'; ctx.shadowBlur = 4; ctx.shadowOffsetX = 2; ctx.shadowOffsetY = 2;
    ctx.beginPath(); ctx.fillStyle = col; ctx.arc(toX(v), toY(pp), 8, 0, Math.PI * 2); ctx.fill();
    ctx.shadowBlur = 0; ctx.shadowOffsetX = 0; ctx.shadowOffsetY = 0;
    ctx.strokeStyle = C.border; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(toX(v), toY(pp), 8, 0, Math.PI * 2); ctx.stroke();
    ctx.fillStyle = C.text; ctx.font = 'bold 16px Inter'; ctx.textAlign = 'left';
    ctx.fillText(lb, toX(v) + 12, toY(pp) - 8);
  });

  // Moving dot
  if (running) carnotT = (carnotT + 0.003 * simSpeed) % 1;
  const seg = Math.floor(carnotT * 4), frac = (carnotT * 4) % 1;
  let dotV, dotP;
  if (seg === 0) { dotV = V1 + (V2 - V1) * frac; dotP = n * R_c * T1 / dotV; }
  else if (seg === 1) { dotV = V2 + (V3 - V2) * frac; dotP = C_BC / Math.pow(dotV, GAMMA); }
  else if (seg === 2) { dotV = V3 + (V4 - V3) * frac; dotP = n * R_c * T2 / dotV; }
  else { dotV = V4 + (V1 - V4) * frac; dotP = C_DA / Math.pow(dotV, GAMMA); }
  ctx.shadowColor = C.orange; ctx.shadowBlur = 14;
  ctx.beginPath(); ctx.fillStyle = C.orange;
  ctx.arc(toX(dotV), toY(dotP), 8, 0, Math.PI * 2); ctx.fill();
  ctx.shadowBlur = 0;

  // Info box (cartoon style)
  const eta = (1 - T2 / T1) * 100;
  const boxW = 260, boxH = 58;
  ctx.fillStyle = 'rgba(11, 14, 20, 0.85)';
  ctx.beginPath();
  ctx.roundRect(W / 2 - boxW / 2, 8, boxW, boxH, 14);
  ctx.fill();
  ctx.strokeStyle = C.border; ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.roundRect(W / 2 - boxW / 2, 8, boxW, boxH, 14);
  ctx.stroke();
  ctx.fillStyle = C.text; ctx.font = 'bold 22px Inter'; ctx.textAlign = 'center';
  ctx.fillText(`η = ${eta.toFixed(1)}%`, W / 2, 36);
  ctx.fillStyle = C.muted; ctx.font = 'bold 13px Inter';
  ctx.fillText(`Th=${T1}K  ·  Tc=${T2}K  ·  γ=5/3`, W / 2, 55);
}

// ═══════════════════════════════════════════════════
// ANIMATION LOOP
// ═══════════════════════════════════════════════════
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

// ═══════════════════════════════════════════════════
// EVENTS
// ═══════════════════════════════════════════════════
document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentExp = btn.dataset.exp;
    p = {};
    lastTs = null;
    renderUI();
    initPhysics();
    // Close mobile sidebar
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
window.addEventListener('resize', () => { initPhysics(); });

// ── Mobile menu toggle ──
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');
if (menuToggle && sidebar) {
  menuToggle.addEventListener('click', () => sidebar.classList.toggle('open'));
}

// ── Init ──
renderUI();
initPhysics();
requestAnimationFrame(render);

// ═══════════════════════════════════════════════════
// VFX SYSTEM
// ═══════════════════════════════════════════════════
function spawnParticles(x, y, color, count) {
  for(let i=0; i<count; i++) {
    const ang = Math.random() * Math.PI * 2;
    const speed = Math.random() * 8 + 2;
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
  if (!vfxParticles || vfxParticles.length === 0) return;
  for(let i=vfxParticles.length-1; i>=0; i--) {
    const p = vfxParticles[i];
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.3; // gravity
    p.life -= 0.03;
    if(p.life <= 0) {
      vfxParticles.splice(i, 1);
      continue;
    }
    ctx.globalAlpha = p.life;
    ctx.fillStyle = p.color;
    ctx.shadowColor = p.color;
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.life * 4, 0, Math.PI*2);
    ctx.fill();
  }
  ctx.globalAlpha = 1.0;
  ctx.shadowBlur = 0;
}
