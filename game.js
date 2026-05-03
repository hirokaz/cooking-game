/* =====================================================
   クッキング キッズ - ゲームロジック
   ===================================================== */

// ============ データ定義 ============

const TOOLS = [
  { id: 'pan',       name: 'フライパン',  icon: '🍳', vis: 'pan',       ideal: [3, 8],   desc: 'やくのが とくい' },
  { id: 'pot',       name: 'なべ',         icon: '🍲', vis: 'pot',       ideal: [10, 25], desc: 'にるのが とくい' },
  { id: 'donabe',    name: 'どなべ',      icon: '🥘', vis: 'donabe',    ideal: [20, 40], desc: 'じっくり にこむ' },
  { id: 'microwave', name: 'でんしレンジ', icon: '⚡', vis: 'microwave', ideal: [1, 4],   desc: 'チン！と あたためる' },
  { id: 'toaster',   name: 'トースター',  icon: '🍞', vis: 'toaster',   ideal: [3, 8],   desc: 'こんがり やく' },
];

// 食材
const INGREDIENTS = [
  // ===== やさい (15) =====
  { id: 'cabbage',    name: 'キャベツ',    emoji: '🥬', cat: 'veg' },
  { id: 'lettuce',    name: 'レタス',       emoji: '🥗', cat: 'veg' },
  { id: 'carrot',     name: 'にんじん',    emoji: '🥕', cat: 'veg' },
  { id: 'tomato',     name: 'トマト',       emoji: '🍅', cat: 'veg' },
  { id: 'potato',     name: 'じゃがいも',  emoji: '🥔', cat: 'veg' },
  { id: 'onion',      name: 'たまねぎ',    emoji: '🧅', cat: 'veg' },
  { id: 'corn',       name: 'コーン',       emoji: '🌽', cat: 'veg' },
  { id: 'bean',       name: 'まめ',          emoji: '🫘', cat: 'veg' },
  { id: 'pepper',     name: 'ピーマン',    emoji: '🫑', cat: 'veg' },
  { id: 'mushroom',   name: 'きのこ',       emoji: '🍄', cat: 'veg' },
  { id: 'pumpkin',    name: 'かぼちゃ',    emoji: '🎃', cat: 'veg' },
  { id: 'broccoli',   name: 'ブロッコリー', emoji: '🥦', cat: 'veg' },
  { id: 'eggplant',   name: 'なす',          emoji: '🍆', cat: 'veg' },
  { id: 'cucumber',   name: 'きゅうり',    emoji: '🥒', cat: 'veg' },
  { id: 'garlic',     name: 'にんにく',    emoji: '🧄', cat: 'veg' },

  // ===== くだもの (8) =====
  { id: 'apple',      name: 'りんご',       emoji: '🍎', cat: 'fruit' },
  { id: 'banana',     name: 'バナナ',       emoji: '🍌', cat: 'fruit' },
  { id: 'strawberry', name: 'いちご',       emoji: '🍓', cat: 'fruit' },
  { id: 'lemon',      name: 'レモン',       emoji: '🍋', cat: 'fruit' },
  { id: 'grape',      name: 'ぶどう',       emoji: '🍇', cat: 'fruit' },
  { id: 'peach',      name: 'もも',          emoji: '🍑', cat: 'fruit' },
  { id: 'melon',      name: 'メロン',       emoji: '🍈', cat: 'fruit' },
  { id: 'pineapple',  name: 'パイナップル', emoji: '🍍', cat: 'fruit' },

  // ===== おにく・たまご・にゅうせいひん (12) =====
  { id: 'meat',     name: 'にく',           emoji: '🥩', cat: 'protein' },
  { id: 'chicken',  name: 'とりにく',      emoji: '🍗', cat: 'protein' },
  { id: 'fish',     name: 'さかな',         emoji: '🐟', cat: 'protein' },
  { id: 'shrimp',   name: 'えび',           emoji: '🍤', cat: 'protein' },
  { id: 'squid',    name: 'いか',           emoji: '🦑', cat: 'protein' },
  { id: 'crab',     name: 'かに',           emoji: '🦀', cat: 'protein' },
  { id: 'octopus',  name: 'たこ',           emoji: '🐙', cat: 'protein' },
  { id: 'bacon',    name: 'ベーコン',      emoji: '🥓', cat: 'protein' },
  { id: 'sausage',  name: 'ソーセージ',    emoji: '🌭', cat: 'protein' },
  { id: 'egg',      name: 'たまご',         emoji: '🥚', cat: 'protein' },
  { id: 'milk',     name: 'ぎゅうにゅう', emoji: '🥛', cat: 'protein' },
  { id: 'cheese',   name: 'チーズ',         emoji: '🧀', cat: 'protein' },

  // ===== しゅしょく (4) =====
  { id: 'rice',     name: 'おこめ',        emoji: '🍚', cat: 'staple' },
  { id: 'bread',    name: 'パン',           emoji: '🍞', cat: 'staple' },
  { id: 'baguette', name: 'フランスパン', emoji: '🥖', cat: 'staple' },
  { id: 'noodle',   name: 'めん',           emoji: '🍜', cat: 'staple' },
];

// カテゴリ表示用ラベル
const ING_CATEGORIES = [
  { id: 'veg',     label: '🥬 やさい' },
  { id: 'fruit',   label: '🍎 くだもの' },
  { id: 'protein', label: '🥩 おにく・たまご・にゅうせいひん' },
  { id: 'staple',  label: '🍚 おこめ・パン・めん' },
];

// ちょうみりょう
const SEASONINGS = [
  { id: 'salt',    name: 'しお',         emoji: '🧂' },
  { id: 'sugar',   name: 'さとう',      emoji: '🍬' },
  { id: 'soy',     name: 'しょうゆ',    emoji: '🟫' },
  { id: 'miso',    name: 'みそ',        emoji: '🟤' },
  { id: 'ketchup', name: 'ケチャップ', emoji: '🍅' },
  { id: 'butter',  name: 'バター',      emoji: '🧈' },
  { id: 'black_pepper', name: 'こしょう', emoji: '⚫' },
  { id: 'curry',   name: 'カレーこ',   emoji: '🌶️' },
  { id: 'oil',     name: 'あぶら',      emoji: '🫗' },
  { id: 'sake',    name: 'おさけ',      emoji: '🍶' },
  { id: 'wine',    name: 'ワイン',      emoji: '🍷' },
  { id: 'honey',   name: 'はちみつ',    emoji: '🍯' },
  { id: 'herb',    name: 'ハーブ',      emoji: '🌿' },
];

/* レシピDB
   - tool: どうぐ
   - need: 必須食材/調味料 (すべて必要)
   - rare: レア度 1=普通, 2=ちょっと豪華, 3=高級
   - ideal: 理想時間 (省略時は道具のidealを使用)
*/
const RECIPES = [
  // ====================================================
  // ===== rare 1 (かんたん・ふつう) =====
  // ====================================================

  // ----- フライパン rare1 -----
  { name: 'めだまやき',          emoji: '🍳', tool: 'pan', need: ['egg'], rare: 1, baseScore: 60 },
  { name: 'スクランブルエッグ',  emoji: '🍳', tool: 'pan', need: ['egg', 'milk'], rare: 1, baseScore: 65 },
  { name: 'たまごやき',          emoji: '🍳', tool: 'pan', need: ['egg', 'sugar', 'soy'], rare: 1, baseScore: 72 },
  { name: 'ベーコンエッグ',      emoji: '🍳', tool: 'pan', need: ['egg', 'bacon'], rare: 1, baseScore: 72 },
  { name: 'ソーセージやき',      emoji: '🌭', tool: 'pan', need: ['sausage'], rare: 1, baseScore: 60 },
  { name: 'ホットドッグ',        emoji: '🌭', tool: 'pan', need: ['sausage', 'bread'], rare: 1, baseScore: 72 },
  { name: 'やさいいため',        emoji: '🥬', tool: 'pan', need: ['cabbage', 'salt'], rare: 1, baseScore: 65 },
  { name: 'やきなす',            emoji: '🍆', tool: 'pan', need: ['eggplant', 'soy'], rare: 1, baseScore: 70 },
  { name: 'ピーマンいため',      emoji: '🫑', tool: 'pan', need: ['pepper', 'soy'], rare: 1, baseScore: 65 },
  { name: 'きのこのソテー',      emoji: '🍄', tool: 'pan', need: ['mushroom', 'butter', 'soy'], rare: 1, baseScore: 75 },
  { name: 'ナポリタン',          emoji: '🍝', tool: 'pan', need: ['noodle', 'ketchup'], rare: 1, baseScore: 72 },
  { name: 'ペペロンチーノ',      emoji: '🍝', tool: 'pan', need: ['noodle', 'garlic', 'oil'], rare: 1, baseScore: 78 },
  { name: 'やきそば',            emoji: '🍜', tool: 'pan', need: ['noodle', 'cabbage', 'meat'], rare: 1, baseScore: 80 },
  { name: 'やきうどん',          emoji: '🍜', tool: 'pan', need: ['noodle', 'meat', 'soy'], rare: 1, baseScore: 76 },
  { name: 'チャーハン',          emoji: '🍚', tool: 'pan', need: ['rice', 'egg', 'salt'], rare: 1, baseScore: 75 },
  { name: 'やきにく',            emoji: '🥩', tool: 'pan', need: ['meat', 'soy'], rare: 1, baseScore: 78 },
  { name: 'しょうがやき ふう',   emoji: '🥩', tool: 'pan', need: ['meat', 'soy', 'sugar'], rare: 1, baseScore: 80 },
  { name: 'やきとり',            emoji: '🍢', tool: 'pan', need: ['chicken', 'soy', 'sugar'], rare: 1, baseScore: 78 },
  { name: 'からあげ',            emoji: '🍗', tool: 'pan', need: ['chicken', 'soy', 'oil'], rare: 1, baseScore: 80 },
  { name: 'とんかつ',            emoji: '🍱', tool: 'pan', need: ['meat', 'oil', 'bread'], rare: 1, baseScore: 82 },
  { name: 'いかリング',          emoji: '🦑', tool: 'pan', need: ['squid', 'oil', 'bread'], rare: 1, baseScore: 76 },
  { name: 'ホットケーキ',        emoji: '🥞', tool: 'pan', need: ['egg', 'milk', 'sugar'], rare: 1, baseScore: 80 },
  { name: 'フレンチトースト',    emoji: '🥞', tool: 'pan', need: ['bread', 'egg', 'milk', 'sugar'], rare: 1, baseScore: 82 },
  { name: 'お好みやき',          emoji: '🥞', tool: 'pan', need: ['cabbage', 'egg', 'meat', 'soy'], rare: 1, baseScore: 82 },
  { name: 'たこやき ふう',       emoji: '🐙', tool: 'pan', need: ['octopus', 'egg', 'soy'], rare: 1, baseScore: 80 },
  { name: 'かにたま',            emoji: '🥚', tool: 'pan', need: ['crab', 'egg', 'soy'], rare: 1, baseScore: 82 },

  // ----- なべ rare1 -----
  { name: 'みそしる',            emoji: '🍲', tool: 'pot', need: ['miso'], rare: 1, baseScore: 65 },
  { name: 'なすのみそしる',      emoji: '🍲', tool: 'pot', need: ['eggplant', 'miso'], rare: 1, baseScore: 75 },
  { name: 'トマトスープ',        emoji: '🥣', tool: 'pot', need: ['tomato', 'salt'], rare: 1, baseScore: 70 },
  { name: 'ミルクスープ',        emoji: '🥣', tool: 'pot', need: ['milk', 'potato'], rare: 1, baseScore: 70 },
  { name: 'たまごスープ',        emoji: '🥣', tool: 'pot', need: ['egg', 'salt'], rare: 1, baseScore: 65 },
  { name: 'やさいスープ',        emoji: '🥣', tool: 'pot', need: ['cabbage', 'carrot', 'salt'], rare: 1, baseScore: 75 },
  { name: 'コーンスープ',        emoji: '🥣', tool: 'pot', need: ['corn', 'milk'], rare: 1, baseScore: 75 },
  { name: 'コーンポタージュ',    emoji: '🥣', tool: 'pot', need: ['corn', 'milk', 'butter'], rare: 1, baseScore: 80 },
  { name: 'かぼちゃスープ',      emoji: '🥣', tool: 'pot', need: ['pumpkin', 'milk'], rare: 1, baseScore: 78 },
  { name: 'ブロッコリーのサラダ', emoji: '🥦', tool: 'pot', need: ['broccoli', 'salt'], rare: 1, baseScore: 68 },
  { name: 'ポテトサラダ',        emoji: '🥗', tool: 'pot', need: ['potato', 'onion', 'salt'], rare: 1, baseScore: 72 },
  { name: 'ごはん',              emoji: '🍚', tool: 'pot', need: ['rice'], rare: 1, baseScore: 60 },
  { name: 'おにぎり',            emoji: '🍙', tool: 'pot', need: ['rice', 'salt'], rare: 1, baseScore: 65 },
  { name: 'たまごかけごはん',    emoji: '🍚', tool: 'pot', need: ['rice', 'egg', 'soy'], rare: 1, baseScore: 70 },
  { name: 'いなり',              emoji: '🍙', tool: 'pot', need: ['rice', 'soy', 'sugar'], rare: 1, baseScore: 72 },
  { name: 'かぼちゃのにつけ',    emoji: '🎃', tool: 'pot', need: ['pumpkin', 'soy', 'sugar'], rare: 1, baseScore: 76 },
  { name: 'ラーメン',            emoji: '🍜', tool: 'pot', need: ['noodle', 'miso'], rare: 1, baseScore: 78 },
  { name: 'みそラーメン',        emoji: '🍜', tool: 'pot', need: ['noodle', 'miso', 'meat'], rare: 1, baseScore: 82 },
  { name: 'しょうゆラーメン',    emoji: '🍜', tool: 'pot', need: ['noodle', 'soy', 'meat'], rare: 1, baseScore: 80 },

  // ----- トースター rare1 -----
  { name: 'やきざかな',          emoji: '🐟', tool: 'toaster', need: ['fish', 'salt'], rare: 1, baseScore: 78 },
  { name: 'トースト',            emoji: '🍞', tool: 'toaster', need: ['bread'], rare: 1, baseScore: 55 },
  { name: 'バタートースト',      emoji: '🍞', tool: 'toaster', need: ['bread', 'butter'], rare: 1, baseScore: 65 },
  { name: 'ハニートースト',      emoji: '🍞', tool: 'toaster', need: ['bread', 'honey', 'butter'], rare: 1, baseScore: 80 },
  { name: 'ジャムトースト',      emoji: '🍓', tool: 'toaster', need: ['bread', 'strawberry', 'sugar'], rare: 1, baseScore: 75 },
  { name: 'ピザトースト',        emoji: '🍕', tool: 'toaster', need: ['bread', 'cheese', 'ketchup'], rare: 1, baseScore: 80 },
  { name: 'チーズトースト',      emoji: '🧀', tool: 'toaster', need: ['bread', 'cheese'], rare: 1, baseScore: 72 },
  { name: 'やきおにぎり',        emoji: '🍙', tool: 'toaster', need: ['rice', 'soy'], rare: 1, baseScore: 75 },

  // ----- 土なべ rare1 -----
  { name: 'やきいも',            emoji: '🍠', tool: 'donabe', need: ['potato'], rare: 1, baseScore: 70 },
  { name: 'おでん',              emoji: '🍢', tool: 'donabe', need: ['egg', 'potato', 'soy'], rare: 1, baseScore: 80 },
  { name: 'ぶたしゃぶ',          emoji: '🍲', tool: 'donabe', need: ['meat', 'cabbage', 'mushroom'], rare: 1, baseScore: 82 },
  { name: 'よせなべ',            emoji: '🍲', tool: 'donabe', need: ['fish', 'cabbage', 'mushroom'], rare: 1, baseScore: 80 },

  // ----- 電子レンジ rare1 -----
  { name: 'ホットミルク',        emoji: '🥛', tool: 'microwave', need: ['milk'], rare: 1, baseScore: 50 },
  { name: 'バナナジュース',      emoji: '🥤', tool: 'microwave', need: ['banana', 'milk'], rare: 1, baseScore: 72 },
  { name: 'いちごミルク',        emoji: '🥤', tool: 'microwave', need: ['strawberry', 'milk', 'sugar'], rare: 1, baseScore: 75 },
  { name: 'レモネード',          emoji: '🍋', tool: 'microwave', need: ['lemon', 'sugar'], rare: 1, baseScore: 65 },
  { name: 'スムージー',          emoji: '🥤', tool: 'microwave', need: ['banana', 'strawberry', 'milk'], rare: 1, baseScore: 80 },
  { name: 'フルーツサラダ',      emoji: '🥗', tool: 'microwave', need: ['apple', 'banana', 'strawberry'], rare: 1, baseScore: 76 },
  { name: 'フルーツポンチ',      emoji: '🍹', tool: 'microwave', need: ['apple', 'banana', 'strawberry', 'sugar'], rare: 1, baseScore: 82 },
  { name: 'いちごジャム',        emoji: '🍓', tool: 'pot', need: ['strawberry', 'sugar'], rare: 1, baseScore: 76 },
  { name: 'りんごジャム',        emoji: '🍎', tool: 'pot', need: ['apple', 'sugar'], rare: 1, baseScore: 76 },

  // ====================================================
  // ===== rare 2 (ちょっと豪華) =====
  // ====================================================

  { name: 'ハンバーグ',          emoji: '🍔', tool: 'pan', need: ['meat', 'onion', 'egg'], rare: 2, baseScore: 86 },
  { name: 'チーズハンバーグ',    emoji: '🍔', tool: 'pan', need: ['meat', 'onion', 'egg', 'cheese'], rare: 2, baseScore: 90 },
  { name: 'ハンバーガー',        emoji: '🍔', tool: 'pan', need: ['meat', 'bread', 'cheese', 'lettuce'], rare: 2, baseScore: 88 },
  { name: 'メンチカツ',          emoji: '🍱', tool: 'pan', need: ['meat', 'onion', 'oil', 'bread'], rare: 2, baseScore: 86 },
  { name: 'オムライス',          emoji: '🍳', tool: 'pan', need: ['egg', 'rice', 'ketchup'], rare: 2, baseScore: 85 },
  { name: '天津飯',              emoji: '🍳', tool: 'pan', need: ['rice', 'egg', 'ketchup', 'soy'], rare: 2, baseScore: 86 },
  { name: '中華丼 ふう',         emoji: '🥡', tool: 'pan', need: ['rice', 'meat', 'cabbage', 'mushroom', 'soy'], rare: 2, baseScore: 88 },
  { name: 'カルボナーラ',        emoji: '🍝', tool: 'pan', need: ['noodle', 'egg', 'cheese', 'bacon'], rare: 2, baseScore: 90 },
  { name: 'ミートソース',        emoji: '🍝', tool: 'pan', need: ['noodle', 'meat', 'tomato', 'onion'], rare: 2, baseScore: 88 },
  { name: 'えびのアヒージョ',    emoji: '🍤', tool: 'pan', need: ['shrimp', 'garlic', 'oil'], rare: 2, baseScore: 88 },
  { name: 'ガーリックシュリンプ', emoji: '🍤', tool: 'pan', need: ['shrimp', 'garlic', 'butter', 'salt'], rare: 2, baseScore: 90 },
  { name: 'えびフライ',          emoji: '🍤', tool: 'pan', need: ['shrimp', 'oil', 'bread'], rare: 2, baseScore: 88 },
  { name: 'カレイのムニエル',    emoji: '🐟', tool: 'pan', need: ['fish', 'butter', 'salt', 'lemon'], rare: 2, baseScore: 88 },
  { name: 'ハーブチキン',        emoji: '🍗', tool: 'pan', need: ['chicken', 'herb', 'salt'], rare: 2, baseScore: 86 },
  { name: 'バターチキンカレー',  emoji: '🍛', tool: 'pan', need: ['chicken', 'butter', 'tomato', 'milk', 'curry'], rare: 2, baseScore: 92 },

  { name: 'カレーライス',        emoji: '🍛', tool: 'pot', need: ['meat', 'carrot', 'potato', 'onion', 'curry'], rare: 2, baseScore: 92 },
  { name: 'シーフードカレー',    emoji: '🍛', tool: 'pot', need: ['shrimp', 'squid', 'curry', 'onion'], rare: 2, baseScore: 90 },
  { name: 'カツカレー',          emoji: '🍛', tool: 'pot', need: ['meat', 'potato', 'onion', 'curry', 'oil', 'bread'], rare: 2, baseScore: 94 },
  { name: 'ハヤシライス',        emoji: '🍛', tool: 'pot', need: ['meat', 'onion', 'tomato', 'rice'], rare: 2, baseScore: 88 },
  { name: 'ビーフシチュー',      emoji: '🍲', tool: 'pot', need: ['meat', 'carrot', 'potato', 'onion'], rare: 2, baseScore: 88 },
  { name: 'ボルシチ',            emoji: '🍲', tool: 'pot', need: ['meat', 'tomato', 'cabbage', 'onion'], rare: 2, baseScore: 88 },
  { name: 'ロールキャベツ',      emoji: '🥬', tool: 'pot', need: ['meat', 'cabbage', 'onion'], rare: 2, baseScore: 86 },
  { name: 'にくじゃが',          emoji: '🍲', tool: 'pot', need: ['meat', 'potato', 'carrot', 'onion', 'soy', 'sugar'], rare: 2, baseScore: 90 },
  { name: 'ぎゅうどん',          emoji: '🥡', tool: 'pot', need: ['rice', 'meat', 'onion', 'soy', 'sugar'], rare: 2, baseScore: 88 },
  { name: 'おやこどん',          emoji: '🥡', tool: 'pot', need: ['rice', 'chicken', 'egg', 'onion', 'soy'], rare: 2, baseScore: 88 },
  { name: 'かつどん',            emoji: '🥡', tool: 'pot', need: ['rice', 'meat', 'egg', 'onion', 'soy', 'oil'], rare: 2, baseScore: 92 },
  { name: 'ミネストローネ',      emoji: '🥣', tool: 'pot', need: ['tomato', 'onion', 'bean'], rare: 2, baseScore: 84 },
  { name: 'ラタトゥイユ',        emoji: '🍅', tool: 'pot', need: ['eggplant', 'tomato', 'onion', 'pepper', 'herb'], rare: 2, baseScore: 90 },
  { name: 'カポナータ',          emoji: '🍆', tool: 'pot', need: ['eggplant', 'tomato', 'onion', 'pepper'], rare: 2, baseScore: 86 },
  { name: 'きのこのリゾット',    emoji: '🍚', tool: 'pot', need: ['rice', 'mushroom', 'cheese', 'butter'], rare: 2, baseScore: 90 },
  { name: 'パンプキンリゾット',  emoji: '🎃', tool: 'pot', need: ['rice', 'pumpkin', 'cheese', 'milk'], rare: 2, baseScore: 88 },
  { name: 'すきやき',            emoji: '🍲', tool: 'pot', need: ['meat', 'onion', 'egg', 'soy', 'sugar'], rare: 2, baseScore: 92 },
  { name: 'とんこつラーメン',    emoji: '🍜', tool: 'pot', need: ['noodle', 'meat', 'milk', 'salt'], rare: 2, baseScore: 88 },
  { name: 'カイセンどん',        emoji: '🍣', tool: 'pot', need: ['rice', 'fish', 'shrimp', 'soy'], rare: 2, baseScore: 90 },

  { name: 'グラタン',            emoji: '🧀', tool: 'microwave', need: ['milk', 'cheese', 'noodle'], rare: 2, baseScore: 88 },
  { name: 'プリン',              emoji: '🍮', tool: 'microwave', need: ['egg', 'milk', 'sugar'], rare: 2, baseScore: 85 },
  { name: 'パンプキンプリン',    emoji: '🍮', tool: 'microwave', need: ['pumpkin', 'egg', 'milk', 'sugar'], rare: 2, baseScore: 88 },
  { name: 'チーズケーキ',        emoji: '🍰', tool: 'microwave', need: ['cheese', 'egg', 'sugar', 'lemon'], rare: 2, baseScore: 90 },
  { name: 'ショートケーキ',      emoji: '🍰', tool: 'microwave', need: ['egg', 'milk', 'sugar', 'strawberry', 'butter'], rare: 2, baseScore: 92 },
  { name: 'バナナケーキ',        emoji: '🍰', tool: 'microwave', need: ['banana', 'egg', 'milk', 'sugar'], rare: 2, baseScore: 86 },
  { name: 'りんごケーキ',        emoji: '🍰', tool: 'microwave', need: ['apple', 'egg', 'milk', 'sugar', 'butter'], rare: 2, baseScore: 88 },
  { name: 'いちごパフェ',        emoji: '🍨', tool: 'microwave', need: ['strawberry', 'milk', 'sugar', 'cheese'], rare: 2, baseScore: 86 },

  { name: 'マルゲリータ ピザ',   emoji: '🍕', tool: 'donabe', need: ['baguette', 'cheese', 'tomato', 'herb'], rare: 2, baseScore: 90 },
  { name: 'ピザ',                emoji: '🍕', tool: 'donabe', need: ['bread', 'cheese', 'tomato'], rare: 2, baseScore: 86 },
  { name: 'シーフードピザ',      emoji: '🍕', tool: 'donabe', need: ['bread', 'cheese', 'shrimp', 'squid'], rare: 2, baseScore: 90 },

  { name: 'アップルパイ',        emoji: '🥧', tool: 'toaster', need: ['apple', 'bread', 'butter', 'sugar'], rare: 2, baseScore: 88 },
  { name: 'レモンタルト',        emoji: '🍋', tool: 'toaster', need: ['bread', 'lemon', 'sugar', 'egg'], rare: 2, baseScore: 86 },
  { name: 'クロックムッシュ',    emoji: '🥪', tool: 'toaster', need: ['baguette', 'cheese', 'bacon', 'butter'], rare: 2, baseScore: 90 },
  { name: 'グラタントースト',    emoji: '🧀', tool: 'toaster', need: ['bread', 'cheese', 'milk', 'mushroom'], rare: 2, baseScore: 88 },

  // ====================================================
  // ===== rare 3 (高級！レア！) =====
  // ====================================================

  { name: '★高級ステーキ★',     emoji: '🥩', tool: 'pan', need: ['meat', 'butter', 'black_pepper', 'salt'], rare: 3, baseScore: 98 },
  { name: '★神戸ビーフ★',       emoji: '🥩', tool: 'pan', need: ['meat', 'butter', 'black_pepper', 'salt', 'wine'], rare: 3, baseScore: 100 },
  { name: '★赤ワインソース ステーキ★', emoji: '🍷', tool: 'pan', need: ['meat', 'wine', 'butter', 'black_pepper'], rare: 3, baseScore: 99 },
  { name: '★スーパーオムレツ★', emoji: '🍳', tool: 'pan', need: ['egg', 'cheese', 'milk', 'butter'], rare: 3, baseScore: 95 },
  { name: '★トリュフパスタ★',   emoji: '🍝', tool: 'pan', need: ['noodle', 'butter', 'mushroom', 'cheese', 'oil'], rare: 3, baseScore: 97 },
  { name: '★アクアパッツァ★',   emoji: '🐟', tool: 'pan', need: ['fish', 'tomato', 'garlic', 'wine', 'oil', 'herb'], rare: 3, baseScore: 99 },
  { name: '★ぜいたく フレンチ★', emoji: '🍷', tool: 'pan', need: ['fish', 'wine', 'butter', 'lemon', 'herb'], rare: 3, baseScore: 98 },

  { name: '★ふかひれスープ★',   emoji: '🍜', tool: 'pot', need: ['fish', 'shrimp', 'egg', 'salt'], rare: 3, baseScore: 98 },
  { name: '★おすし★',           emoji: '🍣', tool: 'pot', need: ['rice', 'fish', 'salt'], rare: 3, baseScore: 96 },
  { name: '★おすし プレミアム★', emoji: '🍣', tool: 'pot', need: ['rice', 'fish', 'shrimp', 'crab', 'salt'], rare: 3, baseScore: 100 },
  { name: '★ブッフ・ブルギニョン★', emoji: '🍷', tool: 'pot', need: ['meat', 'wine', 'onion', 'carrot', 'mushroom'], rare: 3, baseScore: 99 },
  { name: '★ロブスターのワイン蒸し★', emoji: '🦞', tool: 'pot', need: ['shrimp', 'wine', 'butter', 'salt'], rare: 3, baseScore: 98 },
  { name: '★さけのにつけ★',     emoji: '🐟', tool: 'pot', need: ['fish', 'sake', 'soy', 'sugar'], rare: 3, baseScore: 95 },
  { name: '★かにのフルコース★', emoji: '🦀', tool: 'pot', need: ['crab', 'wine', 'butter', 'salt', 'lemon'], rare: 3, baseScore: 99 },

  { name: '★シーフードパエリア★', emoji: '🥘', tool: 'donabe', need: ['rice', 'shrimp', 'fish', 'salt'], rare: 3, baseScore: 97 },
  { name: '★まつたけごはん★',   emoji: '🍚', tool: 'donabe', need: ['rice', 'mushroom', 'soy'], rare: 3, baseScore: 95 },
  { name: '★まつたけごはん プレミアム★', emoji: '🍚', tool: 'donabe', need: ['rice', 'mushroom', 'soy', 'sake'], rare: 3, baseScore: 99 },
  { name: '★たいの酒蒸し★',     emoji: '🐟', tool: 'donabe', need: ['fish', 'sake', 'salt', 'lemon'], rare: 3, baseScore: 98 },
  { name: '★高級かいせき★',     emoji: '🍱', tool: 'donabe', need: ['rice', 'fish', 'mushroom', 'sake', 'soy'], rare: 3, baseScore: 100 },

  { name: '★トリュフリゾット★', emoji: '🍚', tool: 'pot', need: ['rice', 'mushroom', 'cheese', 'butter', 'wine'], rare: 3, baseScore: 99 },
  { name: '★レアチーズケーキ★', emoji: '🍰', tool: 'microwave', need: ['cheese', 'milk', 'sugar', 'lemon', 'strawberry'], rare: 3, baseScore: 96 },
  { name: '★フルーツタルト★',   emoji: '🍰', tool: 'toaster', need: ['bread', 'apple', 'strawberry', 'banana', 'sugar', 'butter'], rare: 3, baseScore: 97 },
];

// しっぱい料理 (生焼け / 焦げ)
const FAIL_RAW = [
  { name: 'なまやけ ざんねん...', emoji: '🥶', recipe: 'まだ ひが とおっていないよ。もうちょっと ながく りょうりしてみよう！' },
  { name: 'まだ つめたい...',     emoji: '🥶', recipe: 'なかが しゃりしゃり！ ながめに りょうりしようね' },
];
const FAIL_BURN = [
  { name: 'まっくろ こげ！',      emoji: '🔥', recipe: 'やきすぎちゃった... もうちょっと みじかく しよう！' },
  { name: 'すみに なっちゃった',  emoji: '🪨', recipe: 'こうじゃ たべられないよ〜！ じかんに ちゅうい！' },
];
const FAIL_MYSTERY = [
  { name: 'なぞの りょうり',     emoji: '👽', recipe: 'なんだろう... これは...？ あたらしい くみあわせを ためしてみよう！' },
  { name: 'びっくり おかし',     emoji: '🤪', recipe: 'みたことない いろ！ でも... たべてみる？' },
];

// しんさいん
const JUDGES = [
  { id: 'kid',     name: 'たろうくん (ようちえん)', avatar: '👦', strict: 0.8, comments: {
      good: ['おいし〜！','すごい！','もういっこ ちょうだい！','ぼくも つくれる かな？'],
      mid:  ['まあまあ！','たべられるよ','ふつう かな〜'],
      bad:  ['うーん...','すこし ふしぎ...','がんばって！'],
      fail: ['たべたくない！','ぴえん','ないしょに してね']
  }},
  { id: 'mom',     name: 'おかあさん',           avatar: '👩', strict: 1.0, comments: {
      good: ['じょうずに できたね！','とっても おいしい！','きょうの ごはんは これに しよう'],
      mid:  ['なかなか やるじゃない','もうちょっとで かんぺき','つぎは もっと おいしく つくろうね'],
      bad:  ['いっしょうけんめい つくったね','れんしゅう しようね','つぎ がんばろう'],
      fail: ['だいじょうぶ、つぎがあるよ','けがしないでね','また ちょうせんしよう！']
  }},
  { id: 'chef',    name: 'シェフ・ピエール',    avatar: '🧑‍🍳', strict: 1.2, comments: {
      good: ['ボナペティ！パーフェクト！','ミシュランきゅうの でき！','ムッシュー、きみは てんさいだ'],
      mid:  ['まあまあだな','プロには まだ とおいぞ','あじは わるくない'],
      bad:  ['うーむ... きそから やりなおしだ','プロの あじとは いえん','きょうみは あるが...'],
      fail: ['シェフを やめろ！','こんな りょうりは みとめん！','ノン！ノン！']
  }},
  { id: 'gourmet', name: 'ぐるめ・はかせ',      avatar: '🤵', strict: 1.1, comments: {
      good: ['しょくざいの ハーモニー！','たまらん あじだ！','ぜんこく1いの でき！'],
      mid:  ['まずまず、けんきゅう のよちあり','もう ひとあじ ほしい','へいきんてきな しあがり'],
      bad:  ['くみあわせを かんがえなさい','びさいに かける','うーん おしい'],
      fail: ['しんじられん！','けんきゅうたいしょう がい','こめんとが できん']
  }},
  { id: 'grandma', name: 'おばあちゃん',         avatar: '👵', strict: 0.9, comments: {
      good: ['まあ じょうずだこと！','おばあちゃん うれしいわ','こんなに じょうずだなんて'],
      mid:  ['よく できました','つぎは もうちょっと','がんばったわね'],
      bad:  ['きを おとさないで','れんしゅう が だいじよ','おばあちゃんも しっぱい したわ'],
      fail: ['つぎは うまくいくわよ','だいじょうぶ だいじょうぶ','わらってわすれましょ']
  }},
];

// ============ 履歴ストレージ ============
// localStorageを基本にしつつ、使えない環境ではメモリ保持にフォールバック
const HISTORY_KEY = 'cookingGameHistory_v1';
const HISTORY_LIMIT = 50;
const memoryHistoryFallback = { items: [] };

function isStorageAvailable() {
  try {
    const k = '__cg_test__';
    localStorage.setItem(k, '1');
    localStorage.removeItem(k);
    return true;
  } catch (e) {
    return false;
  }
}
const STORAGE_OK = isStorageAvailable();

function loadHistory() {
  if (!STORAGE_OK) return memoryHistoryFallback.items.slice();
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    return [];
  }
}

function saveHistory(items) {
  if (!STORAGE_OK) {
    memoryHistoryFallback.items = items.slice(0, HISTORY_LIMIT);
    return;
  }
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(items.slice(0, HISTORY_LIMIT)));
  } catch (e) {
    // 容量オーバーなどは無視
  }
}

function addHistoryRecord(record) {
  const items = loadHistory();
  items.unshift(record);
  saveHistory(items);
}

function clearHistory() {
  if (STORAGE_OK) {
    try { localStorage.removeItem(HISTORY_KEY); } catch (e) {}
  }
  memoryHistoryFallback.items = [];
}

function formatDate(iso) {
  const d = new Date(iso);
  const m = d.getMonth() + 1;
  const day = d.getDate();
  const h = String(d.getHours()).padStart(2, '0');
  const min = String(d.getMinutes()).padStart(2, '0');
  return `${m}/${day} ${h}:${min}`;
}

// ============ 状態 ============
const state = {
  screen: 'title',
  tool: null,
  ingredients: [],   // [{id, emoji, name}]
  seasonings: [],
  cookingTime: 5,
};

// 連打・二重発火を抑止する共有ロック
const locks = {
  chipRemoving: false, // chip 削除アニメ中
  cooking: false,      // クッキングスタート中
};

// ===== トースト =====
let toastTimer = null;
function showToast(msg, duration = 1800) {
  const el = document.getElementById('toast');
  if (!el) return;
  el.textContent = msg;
  el.classList.add('active');
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('active'), duration);
}

// ===== 効果音 (WebAudio) =====
let audioCtx = null;
function ensureAudio() {
  if (audioCtx) return audioCtx;
  try {
    const Ctor = window.AudioContext || window.webkitAudioContext;
    if (Ctor) audioCtx = new Ctor();
  } catch (e) { audioCtx = null; }
  return audioCtx;
}
function playPop() {
  const ctx = ensureAudio();
  if (!ctx) return;
  if (ctx.state === 'suspended') ctx.resume().catch(() => {});
  const t = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(520, t);
  osc.frequency.exponentialRampToValueAtTime(960, t + 0.09);
  gain.gain.setValueAtTime(0.0001, t);
  gain.gain.exponentialRampToValueAtTime(0.18, t + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.18);
  osc.connect(gain).connect(ctx.destination);
  osc.start(t);
  osc.stop(t + 0.2);
}

// ===== 拒否シェイク =====
function shakeDeny(el) {
  if (!el) return;
  el.classList.remove('shake-deny');
  void el.offsetWidth;
  el.classList.add('shake-deny');
  setTimeout(() => el.classList.remove('shake-deny'), 400);
}

// ============ ユーティリティ ============
const $  = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

const screens = {};
$$('.screen').forEach(el => { screens[el.dataset.screen] = el; });

function goTo(name) {
  Object.values(screens).forEach(s => s.classList.remove('active'));
  screens[name].classList.add('active');
  state.screen = name;
  window.scrollTo({ top: 0, behavior: 'smooth' });
  saveProgress();
}

// ============ 進行中ステートの保存/復帰 ============
const PROGRESS_KEY = 'cookingGameProgress_v1';
const RESTORABLE_SCREENS = ['tool', 'ingredient', 'seasoning', 'time'];

function saveProgress() {
  if (!STORAGE_OK) return;
  if (!RESTORABLE_SCREENS.includes(state.screen)) return;
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify({
      screen: state.screen,
      tool: state.tool,
      ingredients: state.ingredients,
      seasonings: state.seasonings,
      cookingTime: state.cookingTime,
      ts: Date.now(),
    }));
  } catch (e) {}
}
function loadProgress() {
  if (!STORAGE_OK) return null;
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    if (!raw) return null;
    const p = JSON.parse(raw);
    if (!p || !RESTORABLE_SCREENS.includes(p.screen)) return null;
    return p;
  } catch (e) { return null; }
}
function clearProgress() {
  if (!STORAGE_OK) return;
  try { localStorage.removeItem(PROGRESS_KEY); } catch (e) {}
}
function refreshContinueButton() {
  const btn = document.getElementById('btn-continue');
  if (!btn) return;
  btn.hidden = !loadProgress();
}
function restoreProgress(p) {
  state.tool = p.tool || null;
  state.ingredients = Array.isArray(p.ingredients) ? p.ingredients : [];
  state.seasonings = Array.isArray(p.seasonings) ? p.seasonings : [];
  state.cookingTime = typeof p.cookingTime === 'number' ? p.cookingTime : 5;

  if (state.tool) {
    $$('.tool-card').forEach(c => c.classList.toggle('selected', c.dataset.tool === state.tool));
    $('#btn-tool-next').disabled = false;
  }
  switch (p.screen) {
    case 'tool':
      goTo('tool');
      break;
    case 'ingredient':
      setupCookStage('ing');
      renderPalette('ingredient-palette', INGREDIENTS, 'ingredients');
      $('#btn-ing-next').disabled = state.ingredients.length === 0;
      goTo('ingredient');
      break;
    case 'seasoning':
      setupCookStage('sea');
      renderPalette('seasoning-palette', SEASONINGS, 'seasonings');
      goTo('seasoning');
      break;
    case 'time':
      setupTime();
      goTo('time');
      break;
    default:
      goTo('title');
  }
}

function getById(list, id) { return list.find(x => x.id === id); }
function containerId(stateKey) {
  return stateKey === 'ingredients' ? 'ingredient-palette' : 'seasoning-palette';
}

// 道具のビジュアルHTML
function buildToolVisual(toolId) {
  const tool = getById(TOOLS, toolId);
  if (!tool) return '';
  const v = tool.vis;
  switch (v) {
    case 'pan':       return `<div class="tool-vis tool-vis--pan"><div class="handle"></div><div class="body"></div><div class="inner"></div></div>`;
    case 'pot':       return `<div class="tool-vis tool-vis--pot"><div class="handle-l"></div><div class="handle-r"></div><div class="body"></div><div class="inner"></div></div>`;
    case 'donabe':    return `<div class="tool-vis tool-vis--donabe"><div class="body"></div><div class="pattern"></div><div class="inner"></div></div>`;
    case 'microwave': return `<div class="tool-vis tool-vis--microwave"><div class="body"></div><div class="window"></div><div class="panel"></div></div>`;
    case 'toaster':   return `<div class="tool-vis tool-vis--toaster"><div class="body"></div><div class="door"></div><div class="knob"></div></div>`;
  }
  return '';
}

// ============ Step1: 道具 ============
function renderTools() {
  const grid = $('#tool-grid');
  grid.innerHTML = TOOLS.map(t => `
    <button class="tool-card" data-tool="${t.id}">
      <div class="tool-icon">${t.icon}</div>
      <div class="tool-name">${t.name}</div>
      <div class="tool-time">めやす ${t.ideal[0]}〜${t.ideal[1]}ふん</div>
    </button>
  `).join('');

  grid.addEventListener('click', e => {
    const card = e.target.closest('.tool-card');
    if (!card) return;
    $$('.tool-card', grid).forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');
    state.tool = card.dataset.tool;
    const next = $('#btn-tool-next');
    const wasDisabled = next.disabled;
    next.disabled = false;
    pulseWhenEnabled(next, wasDisabled);
  });
}

$('#btn-start').addEventListener('click', () => {
  // 「はじめる」は常に新規スタート
  state.tool = null;
  state.ingredients = [];
  state.seasonings = [];
  state.cookingTime = 5;
  $('#btn-tool-next').disabled = true;
  $$('.tool-card').forEach(c => c.classList.remove('selected'));
  goTo('tool');
});
$('#btn-continue').addEventListener('click', () => {
  const p = loadProgress();
  if (p) restoreProgress(p);
});
$('#btn-tool-back').addEventListener('click', () => goTo('title'));
$('#btn-tool-next').addEventListener('click', () => {
  setupCookStage('ing');
  renderPalette('ingredient-palette', INGREDIENTS, 'ingredients');
  goTo('ingredient');
});

// ============ 共通: 道具ステージ表示 ============
function setupCookStage(suffix) {
  const tool = getById(TOOLS, state.tool);
  if (!tool) return;
  $(`#cook-tool-visual-${suffix}`).innerHTML = buildToolVisual(state.tool);
  $(`#cook-tool-label-${suffix}`).textContent = `${tool.icon} ${tool.name}`;
  refreshContents(suffix);
  updateTargetHint(suffix);
}

// ドロップ先（なべ等）を未追加のときにパルスで強調
function updateTargetHint(suffix) {
  const stage = $(`#cook-tool-${suffix}`);
  if (!stage) return;
  if (suffix === 'ing') {
    if (state.ingredients.length === 0) {
      stage.classList.add('needs-target');
      stage.dataset.hint = 'ここに ぐざいを いれてね！';
    } else {
      stage.classList.remove('needs-target');
      stage.dataset.hint = '';
    }
  } else {
    // 調味料は任意なので軽い脈動のみ（ヒントテキストは出さない）
    if (state.seasonings.length === 0) {
      stage.classList.add('needs-target');
      stage.dataset.hint = '';
    } else {
      stage.classList.remove('needs-target');
      stage.dataset.hint = '';
    }
  }
}

// disabled→enabled の遷移時に「押せるよ！」のパルスを焚く
function pulseWhenEnabled(btn, prevDisabled) {
  if (!btn || btn.disabled) return;
  if (!prevDisabled) return;
  btn.classList.remove('ready-pulse');
  void btn.offsetWidth; // reflow でアニメ再起動
  btn.classList.add('ready-pulse');
  setTimeout(() => btn.classList.remove('ready-pulse'), 1500);
}

// 結果画面のスコアを 0 → score にカウントアップ
function countUpScore(target, duration = 720) {
  const el = $('#result-score');
  if (!el) return;
  const start = performance.now();
  function tick(now) {
    const t = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - t, 3);
    el.textContent = Math.round(target * eased);
    if (t < 1) requestAnimationFrame(tick);
    else {
      el.textContent = target;
      el.classList.remove('counting');
      void el.offsetWidth;
      el.classList.add('counting');
    }
  }
  requestAnimationFrame(tick);
}

function refreshContents(suffix) {
  const list = suffix === 'ing' ? state.ingredients : [...state.ingredients, ...state.seasonings];
  const el = $(`#cook-tool-contents-${suffix}`);
  // 食材を区別するため、stateKey と インデックスを埋め込む
  el.innerHTML = list.map((it, i) => {
    // suffixに応じて、削除対象の stateKey と そのリスト内インデックスを記録
    let stateKey, idx;
    if (suffix === 'ing') {
      stateKey = 'ingredients';
      idx = i;
    } else {
      // seasoning画面: ingredientsを先に並べているので、ingredients内ならingredients、それ以降はseasonings
      if (i < state.ingredients.length) {
        stateKey = 'ingredients';
        idx = i;
      } else {
        stateKey = 'seasonings';
        idx = i - state.ingredients.length;
      }
    }
    return `<span class="item-chip" data-statekey="${stateKey}" data-idx="${idx}" title="タップで とりだす">${it.emoji}</span>`;
  }).join('');

  // chipクリックで個別削除（ロックで連打のレースを防止）
  $$('.item-chip', el).forEach(chip => {
    chip.addEventListener('click', e => {
      e.stopPropagation();
      if (locks.chipRemoving) return;
      if (chip.classList.contains('removing')) return;

      const sk = chip.dataset.statekey;
      const idx = parseInt(chip.dataset.idx, 10);
      if (Number.isNaN(idx) || !state[sk] || idx >= state[sk].length) return;

      locks.chipRemoving = true;
      chip.classList.add('removing');
      setTimeout(() => {
        state[sk].splice(idx, 1);
        refreshContents(suffix);
        const palId = sk === 'ingredients' ? 'ingredient-palette' : 'seasoning-palette';
        const pal = $(`#${palId}`);
        if (pal) updatePaletteCounts(pal, state[sk]);
        if (sk === 'ingredients') {
          $('#btn-ing-next').disabled = state.ingredients.length === 0;
        }
        updateResetButtons();
        updateTargetHint(suffix);
        saveProgress();
        locks.chipRemoving = false;
      }, 320);
    });
  });

  updateResetButtons();
}

// ぜんぶもどすボタンの活性制御
function updateResetButtons() {
  const ingBtn = $('#btn-reset-ing');
  const seaBtn = $('#btn-reset-sea');
  if (ingBtn) ingBtn.disabled = state.ingredients.length === 0;
  if (seaBtn) seaBtn.disabled = state.seasonings.length === 0;
}

// ============ Step2/3: パレット & ドラッグ ============
function renderPalette(containerId, items, stateKey) {
  const palette = $(`#${containerId}`);

  if (stateKey === 'ingredients') {
    // 食材はカテゴリ見出し付きで表示
    palette.innerHTML = ING_CATEGORIES.map(cat => {
      const catItems = items.filter(it => it.cat === cat.id);
      if (catItems.length === 0) return '';
      const cardsHtml = catItems.map(it => `
        <div class="item-card" data-id="${it.id}" data-emoji="${it.emoji}" data-name="${it.name}">
          <span class="emoji">${it.emoji}</span>
          <span class="name">${it.name}</span>
        </div>
      `).join('');
      return `<div class="palette-cat-label">${cat.label}</div>${cardsHtml}`;
    }).join('');
  } else {
    // 調味料はフラットに表示
    palette.innerHTML = items.map(it => `
      <div class="item-card" data-id="${it.id}" data-emoji="${it.emoji}" data-name="${it.name}">
        <span class="emoji">${it.emoji}</span>
        <span class="name">${it.name}</span>
      </div>
    `).join('');
  }

  updatePaletteCounts(palette, state[stateKey]);
  attachItemHandlers(palette, stateKey);
}

function updatePaletteCounts(palette, list) {
  $$('.item-card', palette).forEach(card => {
    const id = card.dataset.id;
    const count = list.filter(x => x.id === id).length;
    if (count > 0) {
      card.classList.add('added');
      card.setAttribute('data-count', count);
    } else {
      card.classList.remove('added');
      card.removeAttribute('data-count');
    }
  });
}

// アイテム → 鍋 へ追加（追加できれば true、上限到達なら false）
function addItem(stateKey, id) {
  const source = stateKey === 'ingredients' ? INGREDIENTS : SEASONINGS;
  const data = getById(source, id);
  if (!data) return false;
  const list = state[stateKey];
  // 同じ食材は最大3個まで
  if (list.filter(x => x.id === id).length >= 3) return false;
  list.push({ id: data.id, name: data.name, emoji: data.emoji });
  return true;
}

function removeOneItem(stateKey, id) {
  const list = state[stateKey];
  const idx = list.findIndex(x => x.id === id);
  if (idx >= 0) list.splice(idx, 1);
}

function attachItemHandlers(palette, stateKey) {
  const suffix = stateKey === 'ingredients' ? 'ing' : 'sea';
  const stage = $(`#cook-tool-${suffix}`);
  const ghost = $('#ghost-drag');

  // 共通の追加処理
  const triggerAdd = (id) => {
    const added = addItem(stateKey, id);
    if (!added) {
      const item = getById(stateKey === 'ingredients' ? INGREDIENTS : SEASONINGS, id);
      const label = item ? item.name : '';
      showToast(`${label}は これいじょう いれられないよ`);
      return false;
    }
    playPop();
    refreshContents(suffix);
    updatePaletteCounts(palette, state[stateKey]);
    // ボタン状態
    if (stateKey === 'ingredients') {
      const next = $('#btn-ing-next');
      const wasDisabled = next.disabled;
      next.disabled = state.ingredients.length === 0;
      pulseWhenEnabled(next, wasDisabled);
    }
    updateTargetHint(suffix);
    saveProgress();
    return true;
  };

  // ポインターベースのドラッグ
  $$('.item-card', palette).forEach(card => {
    let dragging = false;
    let scrolling = false; // 縦スクロール意図と判明したらドラッグを諦める
    let startX = 0, startY = 0;
    let pointerId = null;

    const onDown = (e) => {
      pointerId = e.pointerId;
      card.setPointerCapture?.(pointerId);
      dragging = false;
      scrolling = false;
      startX = e.clientX;
      startY = e.clientY;
    };

    const onMove = (e) => {
      if (e.pointerId !== pointerId) return;
      if (scrolling) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      const adx = Math.abs(dx);
      const ady = Math.abs(dy);
      if (!dragging) {
        // 縦スクロール意図を優先（タッチ操作で誤ドラッグを防ぐ）
        if (e.pointerType === 'touch' && ady > 8 && ady > adx * 1.4) {
          scrolling = true;
          card.releasePointerCapture?.(pointerId);
          return;
        }
        if (adx > 8 || ady > 8) {
          dragging = true;
          card.classList.add('dragging');
          ghost.textContent = card.dataset.emoji;
          ghost.classList.add('active');
        }
      }
      if (dragging) {
        ghost.style.left = e.clientX + 'px';
        ghost.style.top  = e.clientY + 'px';

        // ドロップ対象判定
        const rect = stage.getBoundingClientRect();
        const inside =
          e.clientX >= rect.left && e.clientX <= rect.right &&
          e.clientY >= rect.top  && e.clientY <= rect.bottom;
        stage.classList.toggle('drop-target', inside);
      }
    };

    const onUp = (e) => {
      if (e.pointerId !== pointerId) return;
      card.classList.remove('dragging');
      ghost.classList.remove('active');
      stage.classList.remove('drop-target');

      const rect = stage.getBoundingClientRect();
      const inside =
        e.clientX >= rect.left && e.clientX <= rect.right &&
        e.clientY >= rect.top  && e.clientY <= rect.bottom;

      if (scrolling) {
        // スクロール扱い: 何もしない
      } else if (dragging && inside) {
        if (triggerAdd(card.dataset.id)) sparkleAt(stage);
      } else if (!dragging) {
        // タップ＝追加
        if (triggerAdd(card.dataset.id)) sparkleAt(stage);
      }

      dragging = false;
      scrolling = false;
      pointerId = null;
    };

    card.addEventListener('pointerdown', onDown);
    card.addEventListener('pointermove', onMove);
    card.addEventListener('pointerup', onUp);
    card.addEventListener('pointercancel', onUp);
  });
}

function flashRemove(el) {
  const flash = document.createElement('div');
  flash.textContent = '↩';
  flash.style.cssText = 'position:absolute;top:0;left:50%;transform:translateX(-50%);font-size:40px;pointer-events:none;animation:pop-in 0.5s ease-out;';
  el.appendChild(flash);
  setTimeout(() => flash.remove(), 500);
}

function sparkleAt(el) {
  const sparkle = document.createElement('span');
  sparkle.textContent = '✨';
  sparkle.style.cssText = `
    position:absolute;
    top:30%; left:50%;
    transform:translateX(-50%);
    font-size:40px;
    pointer-events:none;
    animation: pop-in 0.4s ease-out, fade-out 0.6s 0.2s ease-out forwards;
    z-index:5;
  `;
  el.style.position = 'relative';
  el.appendChild(sparkle);
  setTimeout(() => sparkle.remove(), 800);
}
// fade-out keyframe (動的追加)
const styleSheet = document.createElement('style');
styleSheet.textContent = `@keyframes fade-out { to { opacity:0; transform: translate(-50%, -30px) scale(1.3);} }`;
document.head.appendChild(styleSheet);


$('#btn-ing-back').addEventListener('click', () => goTo('tool'));
$('#btn-ing-next').addEventListener('click', () => {
  setupCookStage('sea');
  renderPalette('seasoning-palette', SEASONINGS, 'seasonings');
  goTo('seasoning');
});

// ぜんぶもどす（連打中はロック）
$('#btn-reset-ing').addEventListener('click', () => {
  if (locks.chipRemoving) return;
  if (state.ingredients.length === 0) return;
  const chips = $$('#cook-tool-contents-ing .item-chip');
  locks.chipRemoving = true;
  $('#btn-reset-ing').disabled = true;
  chips.forEach((c, i) => {
    c.style.animationDelay = (i * 30) + 'ms';
    c.classList.add('removing');
  });
  setTimeout(() => {
    state.ingredients = [];
    refreshContents('ing');
    updatePaletteCounts($('#ingredient-palette'), state.ingredients);
    $('#btn-ing-next').disabled = true;
    updateResetButtons();
    updateTargetHint('ing');
    saveProgress();
    locks.chipRemoving = false;
  }, 350 + chips.length * 30);
});

$('#btn-reset-sea').addEventListener('click', () => {
  if (locks.chipRemoving) return;
  if (state.ingredients.length === 0 && state.seasonings.length === 0) return;
  const chips = $$('#cook-tool-contents-sea .item-chip');
  const seasoningChips = chips.filter(c => c.dataset.statekey === 'seasonings');
  if (seasoningChips.length === 0) return;
  locks.chipRemoving = true;
  $('#btn-reset-sea').disabled = true;
  seasoningChips.forEach((c, i) => {
    c.style.animationDelay = (i * 30) + 'ms';
    c.classList.add('removing');
  });
  setTimeout(() => {
    state.seasonings = [];
    refreshContents('sea');
    updatePaletteCounts($('#seasoning-palette'), state.seasonings);
    updateResetButtons();
    updateTargetHint('sea');
    saveProgress();
    locks.chipRemoving = false;
  }, 350 + seasoningChips.length * 30);
});

$('#btn-sea-back').addEventListener('click', () => goTo('ingredient'));
$('#btn-sea-next').addEventListener('click', () => {
  setupTime();
  goTo('time');
});

// ============ Step4: 時間 ============
function setupTime() {
  const tool = getById(TOOLS, state.tool);
  const slider = $('#time-slider');
  const max = 60;
  slider.max = max;
  slider.value = state.cookingTime;
  $('#time-value').textContent = state.cookingTime;

  // 適正ゾーン表示
  const okEl = $('#time-meter-ok');
  const fillEl = $('#time-meter-fill');
  okEl.style.left = `${(tool.ideal[0] / max) * 100}%`;
  okEl.style.width = `${((tool.ideal[1] - tool.ideal[0]) / max) * 100}%`;
  fillEl.style.width = `${(state.cookingTime / max) * 100}%`;

  updateTimeHint();
}

function updateTimeHint() {
  const tool = getById(TOOLS, state.tool);
  const t = state.cookingTime;
  const hint = $('#time-hint');
  if (t < tool.ideal[0] * 0.6)        hint.textContent = '⚠ みじかすぎる！ なまやけに なるかも...';
  else if (t < tool.ideal[0])         hint.textContent = '🤏 もうちょっと ながいほうが よさそう';
  else if (t <= tool.ideal[1])        hint.textContent = '✨ ちょうど いい かんじ！';
  else if (t <= tool.ideal[1] * 1.5)  hint.textContent = '🤏 ちょっと ながすぎ かも...';
  else                                hint.textContent = '⚠ ながすぎる！ こげちゃう！';
}

function setTime(min) {
  state.cookingTime = Math.max(1, Math.min(60, min));
  $('#time-value').textContent = state.cookingTime;
  $('#time-slider').value = state.cookingTime;
  $('#time-meter-fill').style.width = `${(state.cookingTime / 60) * 100}%`;
  updateTimeHint();
  saveProgress();
}

$('#time-slider').addEventListener('input', e => setTime(parseInt(e.target.value, 10)));
$$('.time-btn').forEach(btn => btn.addEventListener('click', () => {
  setTime(state.cookingTime + parseInt(btn.dataset.delta, 10));
}));
$('#btn-time-back').addEventListener('click', () => goTo('seasoning'));
$('#btn-cook-start').addEventListener('click', startCooking);

// ============ Step5: 調理アニメ ============
function startCooking() {
  // 連打防止: 調理中は再起動できないようにロック
  if (locks.cooking) return;
  locks.cooking = true;
  $('#btn-cook-start').disabled = true;

  // 調理画面準備
  $('#cooking-tool-visual').innerHTML = buildToolVisual(state.tool);
  const items = [...state.ingredients, ...state.seasonings];
  $('#cooking-tool-contents').innerHTML = items.map(it => `<span class="item-chip">${it.emoji}</span>`).join('');
  $('#cooking-title').textContent = 'クッキング ちゅう...';

  goTo('cooking');

  // タイマー (1ふん = 0.4びょう、最低でも 3秒、最大でも 12秒)
  const realDuration = Math.max(3000, Math.min(12000, state.cookingTime * 400));
  const startedAt = performance.now();
  const fillEl = $('#cooking-timer-fill');
  const textEl = $('#cooking-timer-text');

  function frame(now) {
    const elapsed = now - startedAt;
    const ratio = Math.min(1, elapsed / realDuration);
    fillEl.style.width = `${(1 - ratio) * 100}%`;
    const remainingMin = Math.ceil((1 - ratio) * state.cookingTime);
    textEl.textContent = `のこり ${remainingMin}ふん`;

    // 演出: 後半で「もうすぐ できる！」
    if (ratio > 0.7 && !textEl.dataset.flagged) {
      textEl.dataset.flagged = '1';
      $('#cooking-title').textContent = 'もうすぐ できる！🎉';
    }

    if (ratio < 1) {
      requestAnimationFrame(frame);
    } else {
      delete textEl.dataset.flagged;
      finishCooking();
    }
  }
  requestAnimationFrame(frame);
}

// ============ レシピ判定 ============
function matchRecipe() {
  const allIds = [
    ...state.ingredients.map(x => x.id),
    ...state.seasonings.map(x => x.id),
  ];
  const idSet = new Set(allIds);

  // tool一致 & need全部所持
  const candidates = RECIPES.filter(r =>
    r.tool === state.tool && r.need.every(n => idSet.has(n))
  );
  if (candidates.length === 0) return null;

  // レアリティが高いもの優先、同じレアリティなら need の数が多いもの (より特定的)
  candidates.sort((a, b) => {
    if (b.rare !== a.rare) return b.rare - a.rare;
    return b.need.length - a.need.length;
  });

  // 1/8の確率で「奇跡の高級化」: 最高レアの高級レシピ候補をボーナス選出
  // (rare2のレシピでも入っている食材が高級なら rare3 にアップグレード)
  const top = candidates[0];

  // ラッキー: rare3が候補にあれば確実にそれを採用
  return top;
}

// 焼き加減判定
function judgeCookingTime(idealOverride) {
  const tool = getById(TOOLS, state.tool);
  const [lo, hi] = idealOverride || tool.ideal;
  const t = state.cookingTime;

  if (t < lo * 0.55) return { state: 'raw',         msg: 'なまやけ' };
  if (t < lo)        return { state: 'undercooked', msg: 'すこし なまっぽい' };
  if (t <= hi)       return { state: 'perfect',     msg: 'カンペキ！' };
  if (t <= hi * 1.6) return { state: 'overcooked',  msg: 'ちょっと こげぎみ' };
  return                  { state: 'burnt',         msg: 'まっくろこげ' };
}

// 採点（内訳付きで返す）
function calcScore(recipe, cookJudge) {
  const detail = { base: 0, cookAdj: 0, items: 0, luck: 0, isMiracle: false, total: 0 };
  if (!recipe) {
    detail.base = 30 + Math.floor(Math.random() * 20);
    detail.total = detail.base;
    return detail;
  }
  let score = recipe.baseScore;
  detail.base = recipe.baseScore;

  const beforeCook = score;
  switch (cookJudge.state) {
    case 'raw':         score = Math.floor(score * 0.25); break;
    case 'undercooked': score = Math.floor(score * 0.65); break;
    case 'perfect':     score += 3; break;
    case 'overcooked':  score = Math.floor(score * 0.75); break;
    case 'burnt':       score = Math.floor(score * 0.2); break;
  }
  detail.cookAdj = score - beforeCook;

  const totalItems = state.ingredients.length + state.seasonings.length;
  detail.items = Math.min(4, Math.floor(totalItems / 2));
  score += detail.items;

  detail.luck = Math.floor(Math.random() * 5) - 2;
  score += detail.luck;

  score = Math.max(0, Math.min(99, score));

  // ★100点は「奇跡」: rare3レシピ × perfect焼き × 高得点 × 約7%の運の四重条件
  if (
    recipe.rare === 3 &&
    cookJudge.state === 'perfect' &&
    score >= 96 &&
    Math.random() < 0.07
  ) {
    score = 100;
    detail.isMiracle = true;
  }

  detail.total = score;
  return detail;
}

// ============ 結果表示 ============
function finishCooking() {
  const cookJudge = judgeCookingTime();
  let recipe = matchRecipe();

  // しっぱい判定: 生焼け or 焦げの場合は強制失敗
  let finalDish;
  let isFail = false;
  let banner = 'かんせい！';

  if (cookJudge.state === 'raw') {
    finalDish = pick(FAIL_RAW);
    isFail = true;
    banner = 'しっぱい... 🥶';
  } else if (cookJudge.state === 'burnt') {
    finalDish = pick(FAIL_BURN);
    isFail = true;
    banner = 'しっぱい... 🔥';
  } else if (!recipe) {
    finalDish = pick(FAIL_MYSTERY);
    isFail = true;
    banner = 'なぞの りょうり！？';
  } else {
    finalDish = recipe;
    if (recipe.rare === 3) banner = '★レア！高級りょうり★';
    else if (cookJudge.state === 'perfect' && recipe.rare === 2) banner = 'すごい！じょうずに できた！';
  }

  let scoreDetail = null;
  let score;
  if (isFail) {
    score = Math.floor(Math.random() * 35) + 10;
  } else {
    scoreDetail = calcScore(recipe, cookJudge);
    score = scoreDetail.total;
  }

  // 描画
  $('#result-emoji').textContent = finalDish.emoji;
  $('#result-name').textContent = finalDish.name;

  const usedIngs = state.ingredients.map(x => x.name).join('・');
  const usedSeas = state.seasonings.map(x => x.name).join('・');
  let recipeText = '';
  if (isFail) {
    recipeText = finalDish.recipe || '';
  } else {
    const tool = getById(TOOLS, state.tool);
    recipeText = `【つかったどうぐ】${tool.name}\n【ぐざい】${usedIngs || 'なし'}\n【ちょうみりょう】${usedSeas || 'なし'}\n【じかん】${state.cookingTime}ふん（${cookJudge.msg}）`;
  }
  $('#result-recipe').textContent = recipeText;

  const banner_el = $('#result-banner');
  // 100点なら特別バナーで上書き
  if (score === 100) {
    banner_el.textContent = '🌟 きせきの まんてん！ 🌟';
    banner_el.classList.add('miracle');
  } else {
    banner_el.textContent = banner;
    banner_el.classList.remove('miracle');
  }
  banner_el.classList.toggle('fail', isFail);
  $('#result-card').classList.toggle('fail', isFail);
  $('#result-card').classList.toggle('miracle', score === 100);

  countUpScore(score);

  // ★表示
  const stars = Math.round(score / 20);
  $('#result-stars').textContent = '★'.repeat(stars) + '☆'.repeat(5 - stars);

  // 点数の ないわけ（成功時のみ）
  renderScoreBreakdown(scoreDetail, cookJudge, recipe, isFail);

  // しんさいん
  const judgesData = renderJudges(score, finalDish, isFail);

  // 履歴に保存
  const tool = getById(TOOLS, state.tool);
  const record = {
    id: Date.now() + '_' + Math.random().toString(36).slice(2, 7),
    date: new Date().toISOString(),
    dish: {
      name: finalDish.name,
      emoji: finalDish.emoji,
      isFail: isFail,
      rare: (recipe && recipe.rare) || 0,
    },
    tool: { id: tool.id, name: tool.name, icon: tool.icon },
    ingredients: state.ingredients.map(x => ({ id: x.id, name: x.name, emoji: x.emoji })),
    seasonings: state.seasonings.map(x => ({ id: x.id, name: x.name, emoji: x.emoji })),
    cookingTime: state.cookingTime,
    cookState: cookJudge.state,
    cookMsg: cookJudge.msg,
    score: score,
    judges: judgesData,
  };
  addHistoryRecord(record);

  // 進行ロックを解放し、進行中ステートはクリア
  locks.cooking = false;
  $('#btn-cook-start').disabled = false;
  clearProgress();

  goTo('result');

  // 紙吹雪 (高得点の時)
  if (!isFail && score >= 80) {
    launchConfetti();
    // 100点は奇跡なので追加の紙吹雪!
    if (score === 100) {
      setTimeout(launchConfetti, 300);
      setTimeout(launchConfetti, 700);
    }
  }
}

function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

// スコアの ないわけ表示
function renderScoreBreakdown(detail, cookJudge, recipe, isFail) {
  const wrap = $('#score-breakdown');
  const list = $('#score-breakdown-list');
  const tips = $('#score-tips');
  if (!wrap) return;
  if (isFail || !detail || !recipe) {
    wrap.hidden = true;
    return;
  }
  wrap.hidden = false;
  const fmt = (n) => (n > 0 ? '+' : '') + n + 'てん';
  const items = [];
  items.push({ lbl: `🍳 きほん（${recipe.name}）`, val: detail.base + 'てん', cls: 'neutral' });
  if (detail.cookAdj !== 0) {
    items.push({
      lbl: `🔥 やきかげん（${cookJudge.msg}）`,
      val: fmt(detail.cookAdj),
      cls: detail.cookAdj < 0 ? 'minus' : ''
    });
  }
  if (detail.items > 0) items.push({ lbl: '🥬 ぐざいの ボーナス', val: fmt(detail.items), cls: '' });
  if (detail.luck !== 0) {
    items.push({ lbl: '🎲 うん', val: fmt(detail.luck), cls: detail.luck < 0 ? 'minus' : '' });
  }
  if (recipe.rare === 3) items.push({ lbl: '⭐ レア レシピ', val: 'すごい！', cls: 'neutral' });
  if (detail.isMiracle) items.push({ lbl: '🌟 きせきの ボーナス', val: '+α', cls: '' });
  list.innerHTML = items.map(it =>
    `<li><span class="lbl">${it.lbl}</span><span class="val ${it.cls}">${it.val}</span></li>`
  ).join('');

  // ヒント（次に活かせる助言）
  let tip = '';
  switch (cookJudge.state) {
    case 'raw':         tip = '🤏 みじかすぎたよ。じかんを ながくしてみよう！'; break;
    case 'undercooked': tip = '🤏 もう ちょっとだけ ながく やくと よさそう'; break;
    case 'perfect':     tip = '✨ じかんは カンペキ！'; break;
    case 'overcooked':  tip = '🤏 ちょっと ながすぎ。すこし みじかく しよう'; break;
    case 'burnt':       tip = '🔥 ながすぎて こげちゃった。みじかめに しよう'; break;
  }
  if ((state.ingredients.length + state.seasonings.length) <= 1) {
    tip += (tip ? ' ／ ' : '') + 'ぐざいを ふやすと ボーナスが もらえるよ';
  }
  tips.textContent = tip;
}

function renderJudges(score, dish, isFail) {
  const isMiracle = score === 100;
  // 3人ランダム選出
  const chosen = [...JUDGES].sort(() => Math.random() - 0.5).slice(0, 3);
  const judgesData = chosen.map(j => {
    let category, comment, jScore;
    if (isFail) {
      category = 'fail';
      jScore = Math.max(5, Math.floor(score * j.strict + Math.random() * 15 - 7));
    } else {
      const adj = score * j.strict;
      if      (adj >= 85) category = 'good';
      else if (adj >= 60) category = 'mid';
      else                category = 'bad';
      jScore = Math.floor(adj + Math.random() * 10 - 5);
    }
    // 通常は99上限。総合100点(奇跡)時のみ審査員も100到達可能
    const cap = isMiracle ? 100 : 99;
    jScore = Math.max(0, Math.min(cap, jScore));
    comment = pick(j.comments[category]);
    return { name: j.name, avatar: j.avatar, score: jScore, comment };
  });
  const html = judgesData.map(j => `
      <div class="judge">
        <div class="judge__avatar">${j.avatar}</div>
        <div class="judge__body">
          <div class="judge__name">${j.name}</div>
          <div class="judge__comment">「${j.comment}」</div>
        </div>
        <div class="judge__score">${j.score}</div>
      </div>
    `).join('');
  $('#result-judges').innerHTML = html;
  return judgesData;
}

function launchConfetti() {
  const emojis = ['🎉','✨','⭐','🎊','🌟','💫'];
  for (let i = 0; i < 26; i++) {
    const el = document.createElement('span');
    el.className = 'confetti';
    el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    el.style.left = Math.random() * 100 + 'vw';
    el.style.animationDuration = (1.6 + Math.random() * 1.6) + 's';
    el.style.animationDelay = (Math.random() * 0.4) + 's';
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 3500);
  }
}

// ============ もういちど ============
$('#btn-again').addEventListener('click', () => {
  state.tool = null;
  state.ingredients = [];
  state.seasonings = [];
  state.cookingTime = 5;
  $('#btn-tool-next').disabled = true;
  $('#btn-ing-next').disabled = true;
  $$('.tool-card').forEach(c => c.classList.remove('selected'));
  clearProgress();
  refreshContinueButton();
  goTo('title');
});

// ============ 履歴画面 ============
function renderHistory() {
  const items = loadHistory();
  const statsEl = $('#history-stats');
  const listEl = $('#history-list');

  // 統計
  if (items.length === 0) {
    statsEl.innerHTML = '';
    listEl.innerHTML = `
      <div class="history-empty">
        <div class="history-empty__icon">🍽️</div>
        <p class="history-empty__text">
          まだ なにも つくっていないよ。<br/>
          りょうりを つくると ここに あらわれるよ！
        </p>
      </div>
    `;
    return;
  }

  const cookCount = items.length;
  const successCount = items.filter(r => !r.dish.isFail).length;
  const failCount = items.filter(r => r.dish.isFail).length;
  const rareCount = items.filter(r => r.dish.rare === 3).length;
  const bestScore = items.reduce((max, r) => Math.max(max, r.score), 0);
  const avgScore = Math.round(items.reduce((sum, r) => sum + r.score, 0) / items.length);

  statsEl.innerHTML = `
    <div class="stat-card">
      <div class="stat-card__icon">🍳</div>
      <div class="stat-card__label">つくった かい</div>
      <div class="stat-card__value">${cookCount}</div>
    </div>
    <div class="stat-card stat-card--gold">
      <div class="stat-card__icon">🏆</div>
      <div class="stat-card__label">さいこう とくてん</div>
      <div class="stat-card__value">${bestScore}</div>
    </div>
    <div class="stat-card">
      <div class="stat-card__icon">📊</div>
      <div class="stat-card__label">へいきん てん</div>
      <div class="stat-card__value">${avgScore}</div>
    </div>
    <div class="stat-card">
      <div class="stat-card__icon">✨</div>
      <div class="stat-card__label">せいこう / しっぱい</div>
      <div class="stat-card__value" style="font-size:18px;">${successCount} / ${failCount}</div>
    </div>
    ${rareCount > 0 ? `
      <div class="stat-card">
        <div class="stat-card__icon">⭐</div>
        <div class="stat-card__label">レアりょうり</div>
        <div class="stat-card__value">${rareCount}</div>
      </div>
    ` : ''}
  `;

  // リスト
  listEl.innerHTML = items.map(r => {
    const classes = ['history-item'];
    if (r.dish.isFail) classes.push('fail');
    if (r.dish.rare === 3) classes.push('rare');
    const stars = Math.round(r.score / 20);
    return `
      <div class="${classes.join(' ')}" data-id="${r.id}">
        <div class="history-item__plate">
          <div class="history-item__emoji">${r.dish.emoji}</div>
        </div>
        <div class="history-item__body">
          <div class="history-item__name">${r.dish.name}</div>
          <div class="history-item__meta">
            <span>${r.tool.icon} ${r.tool.name}</span>
            <span>⏰ ${r.cookingTime}ふん</span>
            <span>${'★'.repeat(stars)}${'☆'.repeat(5 - stars)}</span>
          </div>
          <div class="history-item__date">${formatDate(r.date)}</div>
        </div>
        <div class="history-item__score">
          <span class="history-item__score-num">${r.score}</span>
          <span class="history-item__score-label">てん</span>
        </div>
      </div>
    `;
  }).join('');

  // クリックで詳細モーダル
  listEl.querySelectorAll('.history-item').forEach(el => {
    el.addEventListener('click', () => {
      const id = el.dataset.id;
      const record = items.find(r => r.id === id);
      if (record) showHistoryModal(record);
    });
  });
}

function showHistoryModal(record) {
  $('#hm-emoji').textContent = record.dish.emoji;
  $('#hm-name').textContent = record.dish.name;
  $('#hm-date').textContent = formatDate(record.date);
  $('#hm-score').textContent = record.score;
  const stars = Math.round(record.score / 20);
  $('#hm-stars').textContent = '★'.repeat(stars) + '☆'.repeat(5 - stars);
  $('#hm-score-row').classList.toggle('fail', record.dish.isFail);

  $('#hm-tool').textContent = `${record.tool.icon} ${record.tool.name}`;

  const ingHtml = record.ingredients.length === 0
    ? '<span style="color:#8A6A4A;font-size:13px;">なし</span>'
    : record.ingredients.map(i => `<span class="detail-chip"><span class="detail-chip__emoji">${i.emoji}</span>${i.name}</span>`).join('');
  $('#hm-ingredients').innerHTML = ingHtml;

  const seaHtml = record.seasonings.length === 0
    ? '<span style="color:#8A6A4A;font-size:13px;">なし</span>'
    : record.seasonings.map(s => `<span class="detail-chip"><span class="detail-chip__emoji">${s.emoji}</span>${s.name}</span>`).join('');
  $('#hm-seasonings').innerHTML = seaHtml;

  $('#hm-time').textContent = `${record.cookingTime}ふん（${record.cookMsg}）`;

  $('#hm-judges').innerHTML = (record.judges || []).map(j => `
    <div class="detail-judge">
      <div class="detail-judge__avatar">${j.avatar}</div>
      <div class="detail-judge__body">
        <div class="detail-judge__name">${j.name}</div>
        <div class="detail-judge__comment">「${j.comment}」</div>
      </div>
      <div class="detail-judge__score">${j.score}</div>
    </div>
  `).join('');

  $('#history-modal').classList.add('active');
}

function hideHistoryModal() {
  $('#history-modal').classList.remove('active');
}

// イベントハンドラ
$('#btn-history').addEventListener('click', () => {
  renderHistory();
  goTo('history');
});
$('#btn-result-history').addEventListener('click', () => {
  renderHistory();
  goTo('history');
});
$('#btn-history-back').addEventListener('click', () => goTo('title'));
$('#btn-history-clear').addEventListener('click', () => {
  if (loadHistory().length === 0) return;
  if (confirm('りれきを ぜんぶ けしますか？\n（このそうさは もとに もどせません）')) {
    clearHistory();
    renderHistory();
  }
});
$('#history-modal-close').addEventListener('click', hideHistoryModal);
$('#history-modal').addEventListener('click', e => {
  if (e.target.id === 'history-modal') hideHistoryModal();
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') hideHistoryModal();
});

// ============ チュートリアル ============
const TUTORIAL_KEY = 'cookingGameTutorialSeen_v1';
const TUTORIAL_TOTAL_STEPS = 4;
let tutorialStep = 1;

function hasSeenTutorial() {
  if (!STORAGE_OK) return false;
  try { return localStorage.getItem(TUTORIAL_KEY) === '1'; }
  catch (e) { return false; }
}
function markTutorialSeen() {
  if (!STORAGE_OK) return;
  try { localStorage.setItem(TUTORIAL_KEY, '1'); } catch (e) {}
}

function showTutorialStep(n) {
  tutorialStep = Math.max(1, Math.min(TUTORIAL_TOTAL_STEPS, n));
  $$('.tutorial-step').forEach(el => {
    el.hidden = parseInt(el.dataset.step, 10) !== tutorialStep;
  });
  $$('.tutorial-dot').forEach((dot, i) => {
    dot.classList.toggle('active', i + 1 === tutorialStep);
    dot.classList.toggle('done',   i + 1 <  tutorialStep);
  });
  $('#tutorial-prev').hidden = tutorialStep === 1;
  $('#tutorial-next').textContent = tutorialStep === TUTORIAL_TOTAL_STEPS ? 'はじめる！' : 'つぎへ →';
}

function showTutorial() {
  tutorialStep = 1;
  showTutorialStep(1);
  const overlay = $('#tutorial-overlay');
  overlay.classList.add('active');
  overlay.setAttribute('aria-hidden', 'false');
}
function hideTutorial() {
  const overlay = $('#tutorial-overlay');
  overlay.classList.remove('active');
  overlay.setAttribute('aria-hidden', 'true');
  markTutorialSeen();
}

$('#tutorial-next').addEventListener('click', () => {
  if (tutorialStep >= TUTORIAL_TOTAL_STEPS) hideTutorial();
  else showTutorialStep(tutorialStep + 1);
});
$('#tutorial-prev').addEventListener('click', () => showTutorialStep(tutorialStep - 1));
$('#tutorial-skip').addEventListener('click', hideTutorial);
$('#btn-howto').addEventListener('click', showTutorial);
document.addEventListener('keydown', e => {
  if (!$('#tutorial-overlay').classList.contains('active')) return;
  if (e.key === 'Escape') hideTutorial();
  else if (e.key === 'ArrowRight') $('#tutorial-next').click();
  else if (e.key === 'ArrowLeft' && tutorialStep > 1) showTutorialStep(tutorialStep - 1);
});

// 無効ボタンを押したときに shake してメッセージを出す（無反応の解消）
document.addEventListener('pointerdown', (e) => {
  const btn = e.target.closest('button');
  if (!btn || !btn.disabled) return;
  shakeDeny(btn);
  // ぐざい未追加で「つぎへ」
  if (btn.id === 'btn-ing-next' && state.ingredients.length === 0) {
    showToast('まずは ぐざいを なべに いれてね');
  } else if (btn.id === 'btn-tool-next' && !state.tool) {
    showToast('どうぐを えらんでね');
  } else if (btn.id === 'btn-reset-ing' || btn.id === 'btn-reset-sea') {
    // 何も入っていないので無反応はそのまま、見た目の shake のみ
  }
}, true);

// ============ 初期化 ============
renderTools();
goTo('title');
refreshContinueButton();
if (!hasSeenTutorial()) showTutorial();
