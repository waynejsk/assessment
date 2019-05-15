(function() {
  'use strict';

  const userNameInput = document.getElementById('user-name');
  const assessmentButton = document.getElementById('assessment');
  const resultDivision = document.getElementById('result-area');
  const tweetDivision = document.getElementById('tweet-area');

  const answers = [
    '{userName}のいいところは声です。{userName}の特区チョウ的な声は皆を惹きつけ。心に残ります。',
    '{userName}のいいところはまなざしです。{userName}に見つめられた人は。気になって仕方ないでしょう。',
    '{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
    '{userName}のいいところは厳しさです。{userName}の厳しさが物事をいつも成功に導きます。',
    '{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
    '{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
    '{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
    '{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
    '{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
    '{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
    '{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、分かり合うことができます。',
    '{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
    '{userName}のいいところ好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
    '{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
    '{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
    '{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。'
    '{userName}のいいところは優しさです。{userName}の優しい雰囲気や立ち振る舞いに多くの人が癒されています。'
  ];


  function removeAllChildren(element) {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  }


  assessmentButton.onclick = function() {
    const userName = userNameInput.value;
    if (userName.length === 0) {
      return;
    }

    //診断結果の表示
    removeAllChildren(resultDivision);
    const header = document.createElement('h3');
    header.textContent = '診断結果';
    resultDivision.appendChild(header);

    const paragraph = document.createElement('p');
    const result = assessment(userName);
    paragraph.textContent = result;
    resultDivision.appendChild(paragraph);

    //tweet機能
    removeAllChildren(tweetDivision);
    const anchor = document.createElement('a');
    const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag=' + encodeURIComponent('あなたのいいところ') + '&ref_src=twsrc%5Etfw';

    anchor.setAttribute('href', hrefValue);
    anchor.className = 'twitter-hashtag-button';
    anchor.setAttribute('data-text', result);
    anchor.textContent = 'tweet #あなたのいいところ';
    tweetDivision.appendChild(anchor);
    twttr.widgets.load();
  }


  userNameInput.onkeydown = (event) => {
    if (event.key === 'Enter') {
      assessmentButton.onclick();
    }
  }


  function assessment (userName) {
    // 全文字のコード番号を取得してそれを足し合わせる。
    let sumOfcharCode = 0;
    for (let i = 0; i < userName.length; i++) {
      sumOfcharCode = sumOfcharCode + userName.charCodeAt(i);
    }
    //文字コードのコード番号の合計を回答の数で割って添え字の数値を求める。
    const index = sumOfcharCode % answers.length;
    let result = answers[index];
    result = result.replace(/\{userName\}/g, userName);

    return result;
  }


})();
