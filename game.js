const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// マスの設定
const gridSize = 40;
const rows = 12;
const cols = 16;

// キャラクターの設定
let player = { x: 0, y: 0, hasWateringCan: false };
let wateringCan = { x: 5, y: 5 };
let flowerPot = { x: 10, y: 10 };

// 矢印の方向
const directions = [
  { x: 1, y: 0 },  // 右
  { x: 0, y: 1 },  // 下
  { x: -1, y: 0 }, // 左
  { x: 0, y: -1 }  // 上
];
let currentDirection = 0;

// ゲームのループ
function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

// 更新処理
function update() {
  // キャラクターの自動移動
  player.x += directions[currentDirection].x;
  player.y += directions[currentDirection].y;

  // 画面外に出ないように制限
  player.x = Math.max(0, Math.min(cols - 1, player.x));
  player.y = Math.max(0, Math.min(rows - 1, player.y));

  // じょうろを取得
  if (player.x === wateringCan.x && player.y === wateringCan.y) {
    player.hasWateringCan = true;
  }

  // 植木鉢に到達してじょうろを持っているか確認
  if (player.x === flowerPot.x && player.y === flowerPot.y && player.hasWateringCan) {
    alert('クリア！花が咲きました！');
    resetGame();
  }
}

// ゲームリセット
function resetGame() {
  player.x = 0;
  player.y = 0;
  player.hasWateringCan = false;
}

// 描画処理
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // グリッド描画
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      ctx.strokeRect(col * gridSize, row * gridSize, gridSize, gridSize);
    }
  }

  // じょうろ描画
  ctx.fillStyle = 'blue';
  ctx.fillRect(wateringCan.x * gridSize, wateringCan.y * gridSize, gridSize, gridSize);

  // 植木鉢描画
  ctx.fillStyle = 'green';
  ctx.fillRect(flowerPot.x * gridSize, flowerPot.y * gridSize, gridSize, gridSize);

  // キャラクター描画
  ctx.fillStyle = 'red';
  ctx.fillRect(player.x * gridSize, player.y * gridSize, gridSize, gridSize);
}

// ゲーム開始
gameLoop();
