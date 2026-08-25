const planData = {
  control: [
    ['Essential', 'The basics for your home', 'From 119 kr/mo'],
    ['Comfort', 'More cover for everyday surprises', 'From 159 kr/mo'],
    ['Complete', 'Our broadest level of protection', 'From 199 kr/mo']
  ],
  treatment: [
    ['Comfort', 'Strong everyday cover, including accidental damage', 'From 159 kr/mo', true],
    ['Essential', 'The basics for your home', 'From 119 kr/mo'],
    ['Complete', 'Our broadest level of protection', 'From 199 kr/mo']
  ]
};

function renderPlans(version) {
  const html = planData[version].map(([name, detail, price, recommended]) => `
    <article class="plan ${recommended ? 'recommended' : ''}">
      ${recommended ? '<span class="recommendation">Recommended for you</span>' : ''}
      <div class="plan-top"><span>${name}</span><span>${price}</span></div>
      <p>${detail}</p>${recommended ? '<p class="selected"><span class="check">✓</span> Best fit for your needs</p>' : ''}
    </article>`).join('');
  document.querySelector('#plans').innerHTML = html;
  document.querySelector('#quote-help').textContent = version === 'treatment' ? 'We have highlighted a strong fit based on the details you shared.' : 'Compare what is included in each option.';
  document.querySelector('#design-title').textContent = version === 'treatment' ? 'Treatment: a supported choice' : 'Control: full comparison';
  document.querySelector('#design-copy').textContent = version === 'treatment' ? 'A recommendation gives the customer a meaningful starting point, while every option stays visible and easy to choose.' : 'All three options receive equal visual weight. The customer has to build their own mental model before choosing.';
  document.querySelector('#event-name').textContent = version === 'treatment' ? 'cover_recommendation_viewed' : 'cover_option_selected';
}

document.querySelectorAll('[data-variant]').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('[data-variant]').forEach(item => item.classList.remove('active'));
  button.classList.add('active'); renderPlans(button.dataset.variant);
}));
renderPlans('control');

Highcharts.setOptions({
  lang: { decimalPoint: '.', thousandsSep: ',' },
  colors: ['#dff164', '#f0765a', '#94a49d'],
  chart: { style: { fontFamily: 'DM Sans, sans-serif' }, backgroundColor: 'transparent' },
  title: { style: { display: 'none' } }, credits: { enabled: false }, accessibility: { enabled: true }
});

Highcharts.chart('funnel-chart', {
  chart: { type: 'bar', marginLeft: 100, marginRight: 20, marginTop: 10, marginBottom: 35 },
  xAxis: { categories: ['Quote started', 'Details complete', 'Cover selected', 'Quote complete'], lineWidth: 0, tickWidth: 0, labels: { style: { color: '#33453e', fontSize: '12px' } } },
  yAxis: { title: { text: null }, max: 100, tickInterval: 25, gridLineColor: '#d9ddd5', labels: { format: '{value}%', style: { color: '#66736e' } } },
  legend: { align: 'left', verticalAlign: 'bottom', itemStyle: { fontWeight: '500', color: '#33453e' } },
  tooltip: { valueSuffix: '%', shared: true },
  plotOptions: { series: { borderRadius: 0, pointPadding: .08, groupPadding: .13 } },
  series: [{ name: 'Desktop', data: [100, 74, 51, 25], color: '#29403a' }, { name: 'Mobile', data: [100, 69, 38, 18.4], color: '#f0765a' }]
});

Highcharts.chart('effect-chart', {
  chart: { type: 'column', marginLeft: 52, marginRight: 26, marginTop: 20, marginBottom: 62 },
  xAxis: { categories: ['Error rate', 'Support intent', 'Completion time', 'Quote completion'], labels: { style: { color: '#33453e', fontSize: '11px' } } },
  yAxis: { min: -3, max: 6, tickInterval: 1, title: { text: 'Percentage-point difference vs. control', style: { color: '#66736e', fontSize: '11px' } }, plotLines: [{ value: 0, color: '#7f8984', dashStyle: 'Dash', width: 1 }] },
  legend: { enabled: false }, tooltip: { shared: true, valueSuffix: 'pp' },
  plotOptions: { column: { borderWidth: 0, pointPadding: .18, groupPadding: .1 } },
  series: [{ name: 'Observed effect', data: [{ y: -0.1, color: '#94a49d' }, { y: 0.3, color: '#94a49d' }, { y: -0.4, color: '#94a49d' }, { y: 2.6, color: '#f0765a' }] }, { name: '95% confidence interval', type: 'errorbar', data: [[-0.6, 0.4], [-0.5, 1.1], [-1.8, 1.0], [0.7, 4.5]], color: '#29403a', whiskerLength: '45%' }],
  exporting: { enabled: false }
});
