// Builds src/data/districts.json and src/data/map.json from geoBoundaries ADM2.
// Source: geoBoundaries gbOpen BGD ADM2 (CC BY 4.0) — https://www.geoboundaries.org
import { readFileSync, writeFileSync } from 'node:fs';

const src = JSON.parse(
  readFileSync(new URL('./source/geoBoundaries-BGD-ADM2_simplified.geojson', import.meta.url), 'utf8')
);

// geoBoundaries name -> [id, en, bn, division]
const D = {
  Bagerhat: ['bagerhat', 'Bagerhat', 'বাগেরহাট', 'khulna'],
  Bandarban: ['bandarban', 'Bandarban', 'বান্দরবান', 'chattogram'],
  Barguna: ['barguna', 'Barguna', 'বরগুনা', 'barishal'],
  Barisal: ['barishal', 'Barishal', 'বরিশাল', 'barishal'],
  Bhola: ['bhola', 'Bhola', 'ভোলা', 'barishal'],
  Bogra: ['bogura', 'Bogura', 'বগুড়া', 'rajshahi'],
  Brahamanbaria: ['brahmanbaria', 'Brahmanbaria', 'ব্রাহ্মণবাড়িয়া', 'chattogram'],
  Chandpur: ['chandpur', 'Chandpur', 'চাঁদপুর', 'chattogram'],
  Chittagong: ['chattogram', 'Chattogram', 'চট্টগ্রাম', 'chattogram'],
  Chuadanga: ['chuadanga', 'Chuadanga', 'চুয়াডাঙ্গা', 'khulna'],
  Comilla: ['cumilla', 'Cumilla', 'কুমিল্লা', 'chattogram'],
  "Cox's Bazar": ['coxsbazar', "Cox's Bazar", 'কক্সবাজার', 'chattogram'],
  Dhaka: ['dhaka', 'Dhaka', 'ঢাকা', 'dhaka'],
  Dinajpur: ['dinajpur', 'Dinajpur', 'দিনাজপুর', 'rangpur'],
  Faridpur: ['faridpur', 'Faridpur', 'ফরিদপুর', 'dhaka'],
  Feni: ['feni', 'Feni', 'ফেনী', 'chattogram'],
  Gaibandha: ['gaibandha', 'Gaibandha', 'গাইবান্ধা', 'rangpur'],
  Gazipur: ['gazipur', 'Gazipur', 'গাজীপুর', 'dhaka'],
  Gopalganj: ['gopalganj', 'Gopalganj', 'গোপালগঞ্জ', 'dhaka'],
  Habiganj: ['habiganj', 'Habiganj', 'হবিগঞ্জ', 'sylhet'],
  Jamalpur: ['jamalpur', 'Jamalpur', 'জামালপুর', 'mymensingh'],
  Jessore: ['jashore', 'Jashore', 'যশোর', 'khulna'],
  Jhalokati: ['jhalokati', 'Jhalokati', 'ঝালকাঠি', 'barishal'],
  Jhenaidah: ['jhenaidah', 'Jhenaidah', 'ঝিনাইদহ', 'khulna'],
  Joypurhat: ['joypurhat', 'Joypurhat', 'জয়পুরহাট', 'rajshahi'],
  Khagrachhari: ['khagrachhari', 'Khagrachhari', 'খাগড়াছড়ি', 'chattogram'],
  Khulna: ['khulna', 'Khulna', 'খুলনা', 'khulna'],
  Kishoreganj: ['kishoreganj', 'Kishoreganj', 'কিশোরগঞ্জ', 'dhaka'],
  Kurigram: ['kurigram', 'Kurigram', 'কুড়িগ্রাম', 'rangpur'],
  Kushtia: ['kushtia', 'Kushtia', 'কুষ্টিয়া', 'khulna'],
  Lakshmipur: ['lakshmipur', 'Lakshmipur', 'লক্ষ্মীপুর', 'chattogram'],
  Lalmonirhat: ['lalmonirhat', 'Lalmonirhat', 'লালমনিরহাট', 'rangpur'],
  Madaripur: ['madaripur', 'Madaripur', 'মাদারীপুর', 'dhaka'],
  Magura: ['magura', 'Magura', 'মাগুরা', 'khulna'],
  Manikganj: ['manikganj', 'Manikganj', 'মানিকগঞ্জ', 'dhaka'],
  Maulvibazar: ['moulvibazar', 'Moulvibazar', 'মৌলভীবাজার', 'sylhet'],
  Meherpur: ['meherpur', 'Meherpur', 'মেহেরপুর', 'khulna'],
  Munshiganj: ['munshiganj', 'Munshiganj', 'মুন্সিগঞ্জ', 'dhaka'],
  Mymensingh: ['mymensingh', 'Mymensingh', 'ময়মনসিংহ', 'mymensingh'],
  Naogaon: ['naogaon', 'Naogaon', 'নওগাঁ', 'rajshahi'],
  Narail: ['narail', 'Narail', 'নড়াইল', 'khulna'],
  Narayanganj: ['narayanganj', 'Narayanganj', 'নারায়ণগঞ্জ', 'dhaka'],
  Narsingdi: ['narsingdi', 'Narsingdi', 'নরসিংদী', 'dhaka'],
  Natore: ['natore', 'Natore', 'নাটোর', 'rajshahi'],
  Nawabganj: ['chapainawabganj', 'Chapainawabganj', 'চাঁপাইনবাবগঞ্জ', 'rajshahi'],
  Netrakona: ['netrakona', 'Netrakona', 'নেত্রকোণা', 'mymensingh'],
  Nilphamari: ['nilphamari', 'Nilphamari', 'নীলফামারী', 'rangpur'],
  Noakhali: ['noakhali', 'Noakhali', 'নোয়াখালী', 'chattogram'],
  Pabna: ['pabna', 'Pabna', 'পাবনা', 'rajshahi'],
  Panchagarh: ['panchagarh', 'Panchagarh', 'পঞ্চগড়', 'rangpur'],
  Patuakhali: ['patuakhali', 'Patuakhali', 'পটুয়াখালী', 'barishal'],
  Pirojpur: ['pirojpur', 'Pirojpur', 'পিরোজপুর', 'barishal'],
  Rajbari: ['rajbari', 'Rajbari', 'রাজবাড়ী', 'dhaka'],
  Rajshahi: ['rajshahi', 'Rajshahi', 'রাজশাহী', 'rajshahi'],
  Rangamati: ['rangamati', 'Rangamati', 'রাঙ্গামাটি', 'chattogram'],
  Rangpur: ['rangpur', 'Rangpur', 'রংপুর', 'rangpur'],
  Satkhira: ['satkhira', 'Satkhira', 'সাতক্ষীরা', 'khulna'],
  Shariatpur: ['shariatpur', 'Shariatpur', 'শরীয়তপুর', 'dhaka'],
  Sherpur: ['sherpur', 'Sherpur', 'শেরপুর', 'mymensingh'],
  Sirajganj: ['sirajganj', 'Sirajganj', 'সিরাজগঞ্জ', 'rajshahi'],
  Sunamganj: ['sunamganj', 'Sunamganj', 'সুনামগঞ্জ', 'sylhet'],
  Sylhet: ['sylhet', 'Sylhet', 'সিলেট', 'sylhet'],
  Tangail: ['tangail', 'Tangail', 'টাঙ্গাইল', 'dhaka'],
  Thakurgaon: ['thakurgaon', 'Thakurgaon', 'ঠাকুরগাঁও', 'rangpur'],
};

// Equirectangular projection scaled by cos(mean latitude).
const lat0 = 23.8;
const kx = Math.cos((lat0 * Math.PI) / 180);
const SCALE = 120; // px per degree

function ringsOf(geom) {
  return geom.type === 'Polygon' ? [geom.coordinates] : geom.coordinates;
}

// Douglas–Peucker on projected points
function simplify(pts, tol) {
  if (pts.length < 4) return pts;
  const keep = new Uint8Array(pts.length);
  keep[0] = keep[pts.length - 1] = 1;
  const stack = [[0, pts.length - 1]];
  while (stack.length) {
    const [a, b] = stack.pop();
    let max = 0;
    let idx = -1;
    const [ax, ay] = pts[a];
    const [bx, by] = pts[b];
    const dx = bx - ax;
    const dy = by - ay;
    const len = Math.hypot(dx, dy) || 1e-9;
    for (let i = a + 1; i < b; i++) {
      const d = Math.abs(dy * pts[i][0] - dx * pts[i][1] + bx * ay - by * ax) / len;
      if (d > max) {
        max = d;
        idx = i;
      }
    }
    if (max > tol && idx > 0) {
      keep[idx] = 1;
      stack.push([a, idx], [idx, b]);
    }
  }
  return pts.filter((_, i) => keep[i]);
}

let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
const projected = {};
for (const f of src.features) {
  const meta = D[f.properties.shapeName];
  if (!meta) throw new Error(`Unmapped district: ${f.properties.shapeName}`);
  const polys = ringsOf(f.geometry).map((poly) =>
    poly.map((ring) =>
      ring.map(([lon, lat]) => {
        const x = lon * kx * SCALE;
        const y = -lat * SCALE;
        minX = Math.min(minX, x); maxX = Math.max(maxX, x);
        minY = Math.min(minY, y); maxY = Math.max(maxY, y);
        return [x, y];
      })
    )
  );
  projected[meta[0]] = polys;
}

const pad = 4;
const paths = {};
for (const [id, polys] of Object.entries(projected)) {
  let d = '';
  for (const poly of polys) {
    for (const ring of poly) {
      // Rings are closed (first == last); split in two so Douglas–Peucker has a real baseline.
      const open = ring.slice(0, -1);
      const mid = Math.floor(open.length / 2);
      const merged = [
        ...simplify(open.slice(0, mid + 1), 0.7),
        ...simplify(open.slice(mid), 0.7).slice(1),
      ];
      const pts = merged.map(([x, y]) => [x - minX + pad, y - minY + pad]);
      if (pts.length < 3) continue;
      d += 'M' + pts.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join('L') + 'Z';
    }
  }
  paths[id] = d;
}

const width = Math.ceil(maxX - minX + pad * 2);
const height = Math.ceil(maxY - minY + pad * 2);
writeFileSync(
  new URL('../src/data/map.json', import.meta.url),
  JSON.stringify({ viewBox: `0 0 ${width} ${height}`, width, height, paths })
);

const districts = Object.values(D)
  .map(([id, en, bn, division]) => ({ id, en, bn, division }))
  .sort((a, b) => a.en.localeCompare(b.en));
if (districts.length !== 64 || Object.keys(paths).length !== 64) throw new Error('Expected 64 districts');
writeFileSync(
  new URL('../src/data/districts.json', import.meta.url),
  JSON.stringify(districts, null, 2) + '\n'
);
console.log('ok', width, height, Object.values(paths).join('').length, 'bytes of path data');
