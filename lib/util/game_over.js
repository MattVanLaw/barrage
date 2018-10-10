//pull gameOver and saveScore to game util file.

export const hideMenu = (initial, isPaused) => {
  initial = false;
  $w('.start-menu').html('Pause');
  isPaused = false;
  $w('.start-menu').addClass('hidden');
};

const saveScore = (name, score) => {
  name = name || 'noname';
  document.getElementById('name');
  const newScore = {};
  newScore.score = parseInt(scoreEl);

  firebase.database().ref().child('scores/').push({
    name,
    score,
  });
};

let scoreEl = $w('.score').html();

export const gameOver = (hp, boss, stopAnime, score) => {
  if (hp <= 0 || boss.hp < 0) {
    const nameEl = document.getElementById('name');
    $w('.start-menu').html(`Game Over<br/><span class="replay">Press enter to play</span>`);
    let name = 'noname';
    nameEl.addEventListener('change', (e) => {
      name = e.target.value;
    });
    document.getElementsByTagName('form')[0].addEventListener('submit', (e) => {
      e.preventDefault();
      saveScore(name, score);
      document.getElementsByTagName('form')[0].classList.add('hidden');
    });
    $w('.start-menu').removeClass('hidden');
    document.getElementsByTagName('form')[0].classList.remove('hidden');

    $w('.start-menu').off('click', hideMenu);
    document.addEventListener('keydown', (e) => {
      if (e.keyCode === 13) {
        document.location.reload();
      }
    });
    cancelAnimationFrame(stopAnime);
    return true;
  }
};