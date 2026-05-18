import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import {
  Activity,
  Bell,
  CalendarDays,
  ChevronRight,
  ClipboardList,
  Compass,
  CreditCard,
  Crown,
  FileText,
  Handshake,
  Home,
  LineChart,
  Map,
  MessageCircleWarning,
  MoonStar,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Store,
  User,
  Users,
  Wallet,
} from 'lucide-react';

const scenicNames = ['铜官窑', '靖港古镇', '大庸古城', '乌镇'];

const scenicData = {
  铜官窑: {
    flow: 18600,
    sentiment: 86,
    alerts: 3,
    score: 4.32,
    hot: ['夜游排队热度上升', '亲子互动体验好评增加', '陶瓷文创转化偏弱'],
    fix: '优化夜游入园动线，增设亲子研学半日套餐。',
    tags: ['亲子互动型', '夜游休闲型', '文化体验型'],
    insight: '夜游演艺具备强吸引力，但文化互动和排队流程仍需精细化。',
    combo: '夜游动线优化 + 亲子研学产品 + 文创转化提升',
  },
  靖港古镇: {
    flow: 7200,
    sentiment: 82,
    alerts: 2,
    score: 4.18,
    hot: ['本地短途游占比高', '价格感知优势明显', '传播声量偏弱'],
    fix: '包装湘江航运文化路线，强化周末微度假内容种草。',
    tags: ['短途微度假型', '价格敏感型', '民俗体验型'],
    insight: '性价比和慢游氛围较好，但需要把低调口碑转化为可传播内容。',
    combo: '周末微度假包装 + 小红书种草 + 航运文化路线',
  },
  大庸古城: {
    flow: 9800,
    sentiment: 74,
    alerts: 5,
    score: 3.92,
    hot: ['商铺空置感被提及', '夜间体验转化不足', '服务流程评价波动'],
    fix: '引入常态化演艺、市集和商户联动，先修复体验密度。',
    tags: ['城市夜游型', '演艺观望型', '体验补偿型'],
    insight: '硬件体量较大，但游客感知到的体验密度和商业活力不足。',
    combo: '常态演艺引入 + 商户培训 + 舆情口碑修复',
  },
  乌镇: {
    flow: 21500,
    sentiment: 91,
    alerts: 1,
    score: 4.61,
    hot: ['服务标准化口碑稳定', '度假体验成熟', '节假日承载压力存在'],
    fix: '作为标杆库持续对照，不作为主要服务对象。',
    tags: ['深度度假型', '文化体验型', '服务品质型'],
    insight: '标杆景区在服务、品牌和智慧运营上较成熟，可作为湘镇云竞争基准。',
    combo: '标杆指标库 + 服务标准对照 + 智慧运营学习',
  },
};

const navPages = [
  { key: 'home', label: '总览', icon: Home },
  { key: 'profile', label: '画像', icon: Users },
  { key: 'sentiment', label: '预警', icon: Bell },
  { key: 'forecast', label: '预测', icon: LineChart },
  { key: 'business', label: '商业', icon: Wallet },
  { key: 'mine', label: '我的', icon: User },
];

function setHash(page) {
  window.location.hash = page === 'splash' ? '#/' : `#/${page}`;
}

function readHash() {
  const raw = window.location.hash.replace('#/', '') || 'splash';
  if (raw === 'dashboard') return 'home';
  return ['splash', 'home', 'profile', 'sentiment', 'competition', 'forecast', 'review', 'business', 'mine', 'solutions'].includes(raw) ? raw : 'home';
}

export default function App() {
  const [page, setPage] = useState(readHash());
  const [scenic, setScenic] = useState('铜官窑');

  useEffect(() => {
    const onHash = () => setPage(readHash());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const data = scenicData[scenic];

  if (page === 'splash') return <Splash />;

  return (
    <div className="shell">
      <InkBg />
      <main className="phone app-phone">
        <Header scenic={scenic} setScenic={setScenic} />
        <section className="content-scroll">
          {page === 'home' && <HomePage data={data} scenic={scenic} />}
          {page === 'profile' && <ProfilePage data={data} scenic={scenic} />}
          {page === 'sentiment' && <SentimentPage data={data} scenic={scenic} />}
          {page === 'forecast' && <ForecastPage data={data} scenic={scenic} />}
          {page === 'business' || page === 'solutions' ? <BusinessPage data={data} scenic={scenic} /> : null}
          {page === 'mine' && <MinePage scenic={scenic} />}
          {page === 'competition' && <CompetitionPage scenic={scenic} />}
          {page === 'review' && <ReviewPage scenic={scenic} />}
        </section>
        <BottomNav page={page} />
      </main>
    </div>
  );
}

function Splash() {
  const [loading, setLoading] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setLoading((v) => (v >= 92 ? 92 : v + 8)), 130);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="shell">
      <InkBg />
      <section className="phone splash cover-splash">
        <div className="splash-topline">古镇增长服务原型</div>
        <div className="moon"><MoonStar size={34} /></div>
        <div className="brand">
          <span>数引力</span>
          <h1>湘镇云</h1>
          <p>湖南古镇数智化运营增长平台</p>
        </div>
        <div className="hero-card">
          <b>让游客评论转化为古镇增长方案</b>
          <span>数据诊断 · 运营处方 · 服务采购 · 成效复盘 · 会员续费</span>
          <div className="loading-line"><i style={{ width: `${loading}%` }} /></div>
          <small>模型结果加载中 · 平台服务包同步中</small>
        </div>
        <button className="primary" onClick={() => setHash('home')}>进入驾驶舱 <ChevronRight size={18} /></button>
        <p className="note">演示版本｜数据来自论文模型输出和典型运营场景模拟</p>
      </section>
    </div>
  );
}

function InkBg() {
  return <><div className="paper" /><div className="mountain" /><div className="roof roof-a" /><div className="roof roof-b" /></>;
}

function Header({ scenic, setScenic }) {
  return (
    <header className="header compact-header">
      <div className="top-row">
        <div>
          <p>湘镇云数据驾驶舱</p>
          <h2>{scenic}</h2>
        </div>
        <button className="member-chip" onClick={() => setHash('mine')}><Crown size={14} /> 标准运营版</button>
      </div>
      <div className="selector">
        {scenicNames.map((n) => <button key={n} className={n === scenic ? 'active' : ''} onClick={() => setScenic(n)}>{n}</button>)}
      </div>
    </header>
  );
}

function BottomNav({ page }) {
  return (
    <nav className="bottom fixed-bottom">
      {navPages.map((p) => {
        const Icon = p.icon;
        return <button key={p.key} className={page === p.key || (page === 'solutions' && p.key === 'business') ? 'active' : ''} onClick={() => setHash(p.key)}><Icon size={18} /><span>{p.label}</span></button>;
      })}
    </nav>
  );
}

function Card({ title, children, extra, className = '' }) {
  return <section className={`card ${className}`}><div className="card-title"><b>{title}</b>{extra}</div>{children}</section>;
}

function Metric({ icon: Icon, label, value, sub }) {
  return <div className="metric"><Icon size={20} /><span>{label}</span><b>{value}</b><em>{sub}</em></div>;
}

function HomePage({ data, scenic }) {
  return (
    <div className="page">
      <div className="welcome"><Sparkles size={20} /><div><b>今日运营建议</b><p>{data.fix}</p></div></div>
      <div className="grid">
        <Metric icon={Activity} label="今日客流" value={`${(data.flow / 10000).toFixed(2)}万`} sub="实时估算" />
        <Metric icon={Bell} label="舆情健康度" value={data.sentiment} sub="满分100" />
        <Metric icon={MessageCircleWarning} label="预警数量" value={data.alerts} sub="待跟进" />
        <Metric icon={Users} label="综合满意度" value={data.score} sub="五星制" />
      </div>
      <Card title="平台闭环路径">
        <div className="flowline"><span>诊断</span><i /> <span>处方</span><i /> <span>购买服务</span><i /> <span>复盘续费</span></div>
        <p className="para">首页不只展示数据，而是把第七章驾驶舱和第八章商业落地连接起来。</p>
      </Card>
      <Card title="本周热点问题">
        <ul className="hotlist">{data.hot.map((h, i) => <li key={h}><span>{i + 1}</span>{h}</li>)}</ul>
      </Card>
      <Card title="近期客流趋势"><ReactECharts style={{ height: 190 }} option={lineOption([68, 72, 86, 81, 93, 110, 126].map((v) => Math.round(v * data.flow / 10000)), scenic)} /></Card>
      <div className="quick-actions">
        <button onClick={() => setHash('competition')}><Compass size={16} />竞争定位</button>
        <button onClick={() => setHash('review')}><ClipboardList size={16} />运营复盘</button>
        <button onClick={() => setHash('business')}><ShoppingBag size={16} />购买服务</button>
      </div>
    </div>
  );
}

function ProfilePage({ data }) {
  return (
    <div className="page">
      <Card title="游客体验标签"><div className="tags">{['亲子互动型', '文化体验型', '夜游休闲型', '价格敏感型', '短途微度假型'].map((t) => <span className={data.tags.includes(t) ? 'hit' : ''} key={t}>{t}</span>)}</div></Card>
      <Card title="五类体验维度雷达"><ReactECharts style={{ height: 260 }} option={radarOption()} /></Card>
      <Card title="客群占比"><ReactECharts style={{ height: 230 }} option={pieOption()} /></Card>
      <Card title="关键词云"><div className="cloud">{['夜游', '演艺', '排队', '亲子', '文化', '票价', '市集', '导览', '服务', '打卡', '非遗'].map((w, i) => <span style={{ fontSize: 14 + (i % 5) * 4 }} key={w}>{w}</span>)}</div></Card>
      <Card title="平台洞察"><p className="para">{data.insight}</p></Card>
    </div>
  );
}

function SentimentPage({ data }) {
  return (
    <div className="page">
      <div className="score-card"><span>舆情健康度</span><b>{data.sentiment}</b><em>{data.alerts > 3 ? '中高风险' : '可控风险'}</em></div>
      <Card title="负面舆情主题排行"><ReactECharts style={{ height: 230 }} option={barOption(['排队拥堵', '价格争议', '导览不清', '服务态度', '商业化重'], [28, 22, 18, 15, 11])} /></Card>
      <Card title="痛点四元组识别"><div className="table"><div>场景</div><div>主体</div><div>问题</div><div>建议</div>{[['夜游入园', '检票口', '排队时间长', '增设临时通道'], ['商铺消费', '餐饮商户', '价格不透明', '统一明码标价'], ['游览过程', '导览系统', '路线不清晰', '优化地图标识']].flat().map((x, i) => <span key={i}>{x}</span>)}</div></Card>
      <Card title="整改建议"><p className="para">建议先处理高频、低成本、可快速见效的流程问题，再推进内容产品升级。</p><button className="ghost" onClick={() => window.alert('已生成整改建议清单，可进入商业页选择服务包。')}>生成整改建议</button></Card>
    </div>
  );
}

function CompetitionPage({ scenic }) {
  return (
    <div className="page">
      <Card title="IPCA 竞争定位矩阵"><ReactECharts style={{ height: 280 }} option={scatterOption()} /></Card>
      <Card title="与乌镇对标"><p className="para">{scenic} 当前更适合围绕优势体验做差异化突破。湘镇云不替代 OTA，而是帮助景区理解游客反馈、优化产品并提升复购。</p></Card>
      <Card title="体验维度评分"><ReactECharts style={{ height: 240 }} option={barOption(['环境', '文化', '价格', '服务', '演艺'], [82, 76, 68, 74, 88])} /></Card>
    </div>
  );
}

function ForecastPage({ data }) {
  return (
    <div className="page">
      <Card title="客流预测"><ReactECharts style={{ height: 240 }} option={lineOption([1.0, 1.08, 1.16, 1.38, 1.55, 1.44, 1.28].map((v) => Math.round(data.flow * v / 1000)), '预测客流')} /></Card>
      <div className="warning"><CalendarDays size={20} /><b>节假日峰值预警</b><p>预计周末客流较平日上升 38%，建议发布错峰入园提示。</p></div>
      <Card title="活动排期"><div className="timeline"><p><b>周五</b> 预热短视频与达人探店</p><p><b>周六</b> 夜游加场 + 非遗市集</p><p><b>周日</b> 亲子研学半日套餐</p></div></Card>
      <Card title="情景模拟"><p className="para">若夜游体验提升 20%，预计客流增长 12%；若导览效率提升 15%，差评率预计下降 6pct。</p></Card>
    </div>
  );
}

function ReviewPage({ scenic }) {
  return (
    <div className="page">
      <Card title="运营成效复盘"><ReactECharts style={{ height: 230 }} option={barOption(['满意度', '好评率', '夜游转化', '二消'], [4.21, 78, 62, 35])} /></Card>
      <div className="grid"><Metric icon={Sparkles} label="满意度" value="+9.1%" sub="整改后" /><Metric icon={Bell} label="差评率" value="-6.2pct" sub="下降" /><Metric icon={Activity} label="客流" value="+25%" sub="周末" /><Metric icon={Store} label="活动ROI" value="1.8" sub="估算" /></div>
      <Card title="月报生成"><p className="para">已形成 {scenic} 月度运营复盘摘要，可用于景区月度运营会，并支撑下一期续费沟通。</p><button className="ghost" onClick={() => window.alert('月度复盘报告已生成。')}>生成月报</button></Card>
    </div>
  );
}

function BusinessPage({ data, scenic }) {
  const services = [
    { icon: Map, title: '夜游策划', desc: '优化夜游路线、灯光节点与演艺场次。', price: '¥18,000 起', tag: '项目服务费' },
    { icon: Users, title: '研学产品', desc: '设计亲子研学、非遗体验和半日游套餐。', price: '¥8,000 起', tag: '设计费+分成' },
    { icon: ShoppingBag, title: '文创设计', desc: '开发低门槛文创爆品与联名周边。', price: '销售分成', tag: '产品分成' },
    { icon: Sparkles, title: '短视频代运营', desc: '小红书、抖音、达人探店与内容种草。', price: '¥6,000/月+', tag: '月费+佣金' },
    { icon: Handshake, title: '商户培训', desc: '明码标价、服务话术、投诉响应和商户联动。', price: '¥5,000/期', tag: '培训服务费' },
    { icon: Compass, title: '区域联动营销', desc: '联票、接驳、主题线路和古镇集群营销。', price: '定制报价', tag: '政府/集团项目' },
  ];

  return (
    <div className="page">
      <div className="revenue-hero"><Wallet size={24} /><div><b>湘镇云商业闭环</b><p>先用数据诊断发现问题，再通过服务包和解决方案实现收入。</p></div></div>
      <Card title="推荐服务组合" extra={<span className="pill">适配 {scenic}</span>}>
        <p className="para">{data.combo}</p>
        <div className="cta-row"><button className="primary mini" onClick={() => window.alert('已加入服务采购清单。')}>购买推荐服务</button><button className="ghost" onClick={() => setHash('mine')}>查看会员权益</button></div>
      </Card>
      <Card title="平台盈利来源">
        <div className="income-grid">
          <span><b>SaaS年费</b><em>2-15万/年</em></span>
          <span><b>数据报告</b><em>1-5万/份</em></span>
          <span><b>营销代运营</b><em>月费+佣金</em></span>
          <span><b>体验产品</b><em>服务费+分成</em></span>
        </div>
      </Card>
      <div className="services rich-services">
        {services.map((s) => { const Icon = s.icon; return <div className="service" key={s.title}><Icon size={20} /><b>{s.title}</b><p>{s.desc}</p><strong>{s.price}</strong><small>{s.tag}</small><button onClick={() => window.alert(`${s.title} 已加入咨询清单。`)}>立即咨询/购买</button></div>; })}
      </div>
      <Card title="产品版本">
        <div className="plans pricing">
          <span><b>基础诊断版</b><em>2万/年 · 舆情月报 + 画像</em><button>选择</button></span>
          <span className="recommended"><b>标准运营版</b><em>5-8万/年 · 预测 + 复盘 + 建议</em><button>当前推荐</button></span>
          <span><b>高级增长版</b><em>10-15万/年 · 定制报告 + 增长服务</em><button>咨询</button></span>
        </div>
      </Card>
    </div>
  );
}

function MinePage({ scenic }) {
  return (
    <div className="page">
      <section className="member-card">
        <div><p>当前账号</p><h3>{scenic} 管理端</h3><span><Crown size={14} /> 标准运营版会员</span></div>
        <ShieldCheck size={38} />
      </section>
      <div className="grid">
        <Metric icon={CalendarDays} label="服务有效期" value="268天" sub="至 2026-12-31" />
        <Metric icon={FileText} label="剩余报告" value="3份" sub="季度诊断" />
        <Metric icon={CreditCard} label="已购服务" value="2项" sub="代运营/培训" />
        <Metric icon={Wallet} label="预计年费" value="6.8万" sub="标准运营版" />
      </div>
      <Card title="会员权益">
        <div className="benefits"><span>月度舆情监测</span><span>节假日客流预警</span><span>活动复盘报告</span><span>服务商方案推荐</span><span>商户培训折扣</span><span>区域联动报告</span></div>
      </Card>
      <Card title="服务订单">
        <div className="order"><b>短视频代运营</b><em>执行中 · ¥6,000/月</em></div>
        <div className="order"><b>商户服务培训</b><em>待排期 · ¥5,000/期</em></div>
        <button className="primary mini" onClick={() => setHash('business')}>续费/购买增值服务</button>
      </Card>
    </div>
  );
}

const color = ['#4F6F73', '#90A39A', '#B8915E', '#D8C3A5'];
function lineOption(values, name) { return { color, grid: { left: 32, right: 16, top: 24, bottom: 28 }, xAxis: { type: 'category', data: ['一', '二', '三', '四', '五', '六', '日'], axisLine: { show: false }, axisTick: { show: false } }, yAxis: { type: 'value', splitLine: { lineStyle: { color: '#eee4d5' } }, axisLine: { show: false } }, series: [{ name, type: 'line', smooth: true, areaStyle: { opacity: 0.18 }, data: values }] }; }
function radarOption() { return { color, radar: { indicator: ['环境氛围', '文化体验', '价格感知', '服务流程', '核心演艺'].map((n) => ({ name: n, max: 100 })), splitArea: { areaStyle: { color: ['rgba(255,255,255,.45)', 'rgba(144,163,154,.08)'] } } }, series: [{ type: 'radar', data: [{ value: [82, 74, 68, 76, 88], name: '当前景区' }], areaStyle: { opacity: 0.18 } }] }; }
function pieOption() { return { color, tooltip: {}, series: [{ type: 'pie', radius: ['48%', '72%'], data: [{ name: '亲子', value: 28 }, { name: '夜游', value: 26 }, { name: '文化', value: 20 }, { name: '短途', value: 16 }, { name: '价格敏感', value: 10 }] }] }; }
function barOption(names, values) { return { color, grid: { left: 62, right: 16, top: 20, bottom: 24 }, xAxis: { type: 'value', splitLine: { lineStyle: { color: '#eee4d5' } } }, yAxis: { type: 'category', data: names, axisLine: { show: false }, axisTick: { show: false } }, series: [{ type: 'bar', data: values, barWidth: 14, itemStyle: { borderRadius: 8 } }] }; }
function scatterOption() { return { color, grid: { left: 38, right: 20, top: 20, bottom: 34 }, xAxis: { name: '表现差异', min: -5, max: 5, splitLine: { lineStyle: { color: '#eee4d5' } } }, yAxis: { name: '重要度', min: 0, max: 10, splitLine: { lineStyle: { color: '#eee4d5' } } }, series: [{ type: 'scatter', symbolSize: 18, data: [[3, 8, '优势保持'], [-3, 8, '重点改进'], [2, 4, '资源观察'], [-2, 3, '低优先级']], label: { show: true, formatter: (p) => p.data[2], position: 'top' } }] }; }
