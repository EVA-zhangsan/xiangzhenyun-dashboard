import React, { useEffect, useMemo, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import { Activity, Bell, CalendarDays, ChevronRight, Compass, Home, LineChart, Map, MessageCircleWarning, MoonStar, Sparkles, Store, Users } from 'lucide-react';

const scenicNames = ['铜官窑', '靖港古镇', '大庸古城', '乌镇'];
const scenicData = {
  铜官窑: { flow: 18600, sentiment: 86, alerts: 3, score: 4.32, hot: ['夜游排队热度上升', '亲子互动体验好评增加', '陶瓷文创转化偏弱'], fix: '优化夜游入园动线，增设亲子研学半日套餐。', tags: ['亲子互动型', '夜游休闲型', '文化体验型'], insight: '夜游演艺具备强吸引力，但文化互动和排队流程仍需精细化。' },
  靖港古镇: { flow: 7200, sentiment: 82, alerts: 2, score: 4.18, hot: ['本地短途游占比高', '价格感知优势明显', '传播声量偏弱'], fix: '包装湘江航运文化路线，强化周末微度假内容种草。', tags: ['短途微度假型', '价格敏感型', '民俗体验型'], insight: '性价比和慢游氛围较好，但需要把低调口碑转化为可传播内容。' },
  大庸古城: { flow: 9800, sentiment: 74, alerts: 5, score: 3.92, hot: ['商铺空置感被提及', '夜间体验转化不足', '服务流程评价波动'], fix: '引入常态化演艺、市集和商户联动，先修复体验密度。', tags: ['城市夜游型', '演艺观望型', '体验补偿型'], insight: '硬件体量较大，但游客感知到的体验密度和商业活力不足。' },
  乌镇: { flow: 21500, sentiment: 91, alerts: 1, score: 4.61, hot: ['服务标准化口碑稳定', '度假体验成熟', '节假日承载压力存在'], fix: '作为标杆库持续对照，不作为主要服务对象。', tags: ['深度度假型', '文化体验型', '服务品质型'], insight: '标杆景区在服务、品牌和智慧运营上较成熟，可作为湘镇云竞争基准。' }
};

const pages = [
  { key: 'home', label: '总览', icon: Home },
  { key: 'profile', label: '画像', icon: Users },
  { key: 'sentiment', label: '预警', icon: Bell },
  { key: 'forecast', label: '预测', icon: LineChart },
  { key: 'solutions', label: '方案', icon: Store },
];

function setHash(page) { window.location.hash = page === 'splash' ? '#/' : `#/${page}`; }
function readHash() { const raw = window.location.hash.replace('#/', '') || 'splash'; return raw === 'dashboard' ? 'home' : raw; }

export default function App() {
  const [page, setPage] = useState(readHash());
  const [scenic, setScenic] = useState('铜官窑');
  useEffect(() => { const onHash = () => setPage(readHash()); window.addEventListener('hashchange', onHash); return () => window.removeEventListener('hashchange', onHash); }, []);
  const data = scenicData[scenic];
  if (page === 'splash') return <Splash />;
  return <div className="shell"><InkBg /><main className="phone"><Header scenic={scenic} setScenic={setScenic} />{page === 'home' && <HomePage data={data} scenic={scenic} />}{page === 'profile' && <ProfilePage data={data} scenic={scenic} />}{page === 'sentiment' && <SentimentPage data={data} scenic={scenic} />}{page === 'forecast' && <ForecastPage data={data} scenic={scenic} />}{page === 'solutions' && <SolutionsPage data={data} scenic={scenic} />}{page === 'competition' && <CompetitionPage scenic={scenic} />}{page === 'review' && <ReviewPage scenic={scenic} />}<BottomNav page={page} /></main></div>;
}

function Splash() { return <div className="shell"><InkBg /><section className="phone splash"><div className="moon"><MoonStar size={34}/></div><div className="brand"><span>数引力</span><h1>湘镇云</h1><p>湖南古镇数智化运营增长平台</p></div><div className="hero-card"><b>让游客评论转化为古镇增长方案</b><span>游客画像 · 舆情预警 · 竞争定位 · 客流预测 · 运营复盘</span></div><button className="primary" onClick={() => setHash('home')}>进入驾驶舱 <ChevronRight size={18}/></button><p className="note">前端展示原型｜数据来自模型结果与典型运营场景模拟</p></section></div>; }
function InkBg(){ return <><div className="paper"/><div className="mountain"/><div className="roof roof-a"/><div className="roof roof-b"/></>; }
function Header({ scenic, setScenic }) { return <header className="header"><div><p>湘镇云数据驾驶舱</p><h2>{scenic}</h2></div><div className="selector">{scenicNames.map(n => <button key={n} className={n===scenic?'active':''} onClick={()=>setScenic(n)}>{n}</button>)}</div></header>; }
function BottomNav({ page }) { return <nav className="bottom">{pages.map(p => { const Icon=p.icon; return <button key={p.key} className={page===p.key?'active':''} onClick={()=>setHash(p.key)}><Icon size={18}/><span>{p.label}</span></button> })}<button className={page==='competition'||page==='review'?'active':''} onClick={()=>setHash('competition')}><Compass size={18}/><span>对标</span></button></nav>; }
function Card({title, children, extra}){ return <section className="card"><div className="card-title"><b>{title}</b>{extra}</div>{children}</section>; }
function Metric({ icon:Icon, label, value, sub }) { return <div className="metric"><Icon size={20}/><span>{label}</span><b>{value}</b><em>{sub}</em></div>; }

function HomePage({data, scenic}) { return <div className="page"><div className="welcome"><Sparkles size={20}/><div><b>今日运营建议</b><p>{data.fix}</p></div></div><div className="grid"><Metric icon={Activity} label="今日客流" value={(data.flow/10000).toFixed(2)+'万'} sub="实时估算"/><Metric icon={Bell} label="舆情健康度" value={data.sentiment} sub="满分100"/><Metric icon={MessageCircleWarning} label="预警数量" value={data.alerts} sub="待跟进"/><Metric icon={Users} label="综合满意度" value={data.score} sub="五星制"/></div><Card title="本周热点问题"><ul className="hotlist">{data.hot.map((h,i)=><li key={h}><span>{i+1}</span>{h}</li>)}</ul></Card><Card title="近期客流趋势"><ReactECharts style={{height:190}} option={lineOption([68,72,86,81,93,110,126].map(v=>Math.round(v*data.flow/10000)), scenic)} /></Card><Card title="月度重点整改事项"><p className="para">围绕“诊断—处方—执行—复盘”闭环，优先跟进：{data.fix}</p></Card></div>; }
function ProfilePage({data}) { return <div className="page"><Card title="游客体验标签"><div className="tags">{['亲子互动型','文化体验型','夜游休闲型','价格敏感型','短途微度假型'].map(t=><span className={data.tags.includes(t)?'hit':''} key={t}>{t}</span>)}</div></Card><Card title="五类体验维度雷达"><ReactECharts style={{height:260}} option={radarOption()} /></Card><Card title="客群占比"><ReactECharts style={{height:230}} option={pieOption()} /></Card><Card title="关键词云"><div className="cloud">{['夜游','演艺','排队','亲子','文化','票价','市集','导览','服务','打卡','非遗'].map((w,i)=><span style={{fontSize:14+(i%5)*4}} key={w}>{w}</span>)}</div></Card><Card title="平台洞察"><p className="para">{data.insight}</p></Card></div>; }
function SentimentPage({data}) { return <div className="page"><div className="score-card"><span>舆情健康度</span><b>{data.sentiment}</b><em className={data.alerts>3?'mid':'low'}>{data.alerts>3?'中高风险':'可控风险'}</em></div><Card title="负面舆情主题排行"><ReactECharts style={{height:230}} option={barOption(['排队拥堵','价格争议','导览不清','服务态度','商业化重'], [28,22,18,15,11])} /></Card><Card title="痛点四元组识别"><div className="table"><div>场景</div><div>主体</div><div>问题</div><div>建议</div>{[['夜游入园','检票口','排队时间长','增设临时通道'],['商铺消费','餐饮商户','价格不透明','统一明码标价'],['游览过程','导览系统','路线不清晰','优化地图标识']].flat().map((x,i)=><span key={i}>{x}</span>)}</div></Card><Card title="整改建议"><p className="para">建议先处理高频、低成本、可快速见效的流程问题，再推进内容产品升级。</p></Card></div>; }
function CompetitionPage({scenic}) { return <div className="page"><Card title="IPCA 竞争定位矩阵"><ReactECharts style={{height:280}} option={scatterOption()} /></Card><Card title="与乌镇对标"><p className="para">{scenic} 当前更适合围绕优势体验做差异化突破。湘镇云不替代 OTA，而是帮助景区理解游客反馈、优化产品并提升复购。</p></Card><Card title="体验维度评分"><ReactECharts style={{height:240}} option={barOption(['环境','文化','价格','服务','演艺'], [82,76,68,74,88])} /></Card></div>; }
function ForecastPage({data}) { return <div className="page"><Card title="客流预测"><ReactECharts style={{height:240}} option={lineOption([1.0,1.08,1.16,1.38,1.55,1.44,1.28].map(v=>Math.round(data.flow*v/1000)), '预测客流')} /></Card><div className="warning"><CalendarDays size={20}/><b>节假日峰值预警</b><p>预计周末客流较平日上升 38%，建议发布错峰入园提示。</p></div><Card title="活动排期"><div className="timeline"><p><b>周五</b> 预热短视频与达人探店</p><p><b>周六</b> 夜游加场 + 非遗市集</p><p><b>周日</b> 亲子研学半日套餐</p></div></Card><Card title="情景模拟"><p className="para">若夜游体验提升 20%，预计客流增长 12%；若导览效率提升 15%，差评率预计下降 6pct。</p></Card></div>; }
function ReviewPage({scenic}) { return <div className="page"><Card title="运营成效复盘"><ReactECharts style={{height:230}} option={barOption(['满意度','好评率','夜游转化','二消'], [4.21,78,62,35])} /></Card><div className="grid"><Metric icon={Sparkles} label="满意度" value="+9.1%" sub="整改后"/><Metric icon={Bell} label="差评率" value="-6.2pct" sub="下降"/><Metric icon={Activity} label="客流" value="+25%" sub="周末"/><Metric icon={Store} label="活动ROI" value="1.8" sub="估算"/></div><Card title="月报生成"><p className="para">已形成 {scenic} 月度运营复盘摘要，可用于景区月度运营会。</p><button className="ghost">生成月报</button></Card></div>; }
function SolutionsPage({scenic}) { const items=['夜游策划','研学产品','文创设计','短视频代运营','商户培训','区域联动营销']; return <div className="page"><Card title="推荐服务组合"><p className="para">基于 {scenic} 当前诊断结果，优先推荐“舆情修复 + 内容种草 + 活动复盘”的轻量增长包。</p></Card><div className="services">{items.map((it,i)=><div className="service" key={it}><Map size={20}/><b>{it}</b><p>{['优化夜游路线与演艺节点','设计非遗与亲子课程','开发低门槛文创爆品','小红书/抖音种草投放','提升商户服务与明码标价','跨景区联票与主题线路'][i]}</p><button>查看方案</button></div>)}</div><Card title="产品版本"><div className="plans"><span>基础诊断版 2万/年</span><span>标准运营版 5-8万/年</span><span>高级增长版 10-15万/年</span></div></Card></div>; }

const color=['#4F6F73','#90A39A','#B8915E','#D8C3A5'];
function lineOption(values,name){return {color, grid:{left:32,right:16,top:24,bottom:28}, xAxis:{type:'category', data:['一','二','三','四','五','六','日'], axisLine:{show:false}, axisTick:{show:false}}, yAxis:{type:'value', splitLine:{lineStyle:{color:'#eee4d5'}}, axisLine:{show:false}}, series:[{name,type:'line',smooth:true,areaStyle:{opacity:.18}, data:values}]};}
function radarOption(){return {color, radar:{indicator:['环境氛围','文化体验','价格感知','服务流程','核心演艺'].map(n=>({name:n,max:100})), splitArea:{areaStyle:{color:['rgba(255,255,255,.45)','rgba(144,163,154,.08)']}}}, series:[{type:'radar', data:[{value:[82,74,68,76,88], name:'当前景区'}], areaStyle:{opacity:.18}}]};}
function pieOption(){return {color, tooltip:{}, series:[{type:'pie', radius:['48%','72%'], data:[{name:'亲子',value:28},{name:'夜游',value:26},{name:'文化',value:20},{name:'短途',value:16},{name:'价格敏感',value:10}]}]};}
function barOption(names,values){return {color, grid:{left:62,right:16,top:20,bottom:24}, xAxis:{type:'value', splitLine:{lineStyle:{color:'#eee4d5'}}}, yAxis:{type:'category', data:names, axisLine:{show:false}, axisTick:{show:false}}, series:[{type:'bar', data:values, barWidth:14, itemStyle:{borderRadius:8}}]};}
function scatterOption(){return {color, grid:{left:38,right:20,top:20,bottom:34}, xAxis:{name:'表现差异', min:-5,max:5, splitLine:{lineStyle:{color:'#eee4d5'}}}, yAxis:{name:'重要度', min:0,max:10, splitLine:{lineStyle:{color:'#eee4d5'}}}, series:[{type:'scatter', symbolSize:18, data:[[3,8,'优势保持'],[-3,8,'重点改进'],[2,4,'资源观察'],[-2,3,'低优先级']], label:{show:true, formatter:p=>p.data[2], position:'top'}}]};}
