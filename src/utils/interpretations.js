import { getTranslation } from '../translations';

// Get the appropriate meaning based on card orientation and language
export function getCardMeaning(card, isReversed, language = 'en') {
  if (language === 'zh') {
    return isReversed ? (card.loveReversedZh || card.loveReversed) : (card.loveUprightZh || card.loveUpright);
  }
  return isReversed ? card.loveReversed : card.loveUpright;
}

// Get card advice based on language
export function getCardAdvice(card, language = 'en') {
  if (language === 'zh') {
    return card.adviceZh || card.advice;
  }
  return card.advice;
}

// Get position name and meaning based on language
function getPositionInfo(position, language) {
  const positionKeys = ['positionSelf', 'positionPartner', 'positionPast', 'positionPresent', 'positionFuture'];
  const meaningKeys = ['positionSelfMeaning', 'positionPartnerMeaning', 'positionPastMeaning', 'positionPresentMeaning', 'positionFutureMeaning'];

  return {
    name: getTranslation(language, positionKeys[position]),
    meaning: getTranslation(language, meaningKeys[position])
  };
}

// Generate interpretation for a single card in a specific position
export function interpretCard(card, position, isReversed, language = 'en') {
  const positionInfo = getPositionInfo(position, language);
  const meaning = getCardMeaning(card, isReversed, language);
  const orientation = getTranslation(language, isReversed ? 'cardReversed' : 'cardUpright');

  return {
    card,
    position,
    positionName: positionInfo.name,
    positionMeaning: positionInfo.meaning,
    isReversed,
    orientation,
    meaning,
    advice: getCardAdvice(card, language)
  };
}

// Generate a comprehensive reading overview based on all cards
export function generateReadingOverview(drawnCards, language = 'en') {
  const majorArcanaCount = drawnCards.filter(c => c.arcana === 'major').length;
  const reversedCount = drawnCards.filter(c => c.isReversed).length;
  const selfIsReversed = drawnCards[0].isReversed;
  const partnerIsReversed = drawnCards[1].isReversed;
  const futureIsReversed = drawnCards[4].isReversed;

  const parts = [];

  if (language === 'zh') {
    // Chinese version - using array to collect parts for better flow

    // Part 1: Card type overview
    if (majorArcanaCount >= 3) {
      parts.push('这次占卜揭示了您爱情生活中的重要精神课题和人生主题');
    } else if (majorArcanaCount === 0) {
      parts.push('这次占卜聚焦于您关系中实际的、日常的方面');
    } else {
      parts.push('这次占卜展示了日常关系动态与更深层精神课题的融合');
    }

    // Part 2: Reversed cards insight
    if (reversedCount >= 4) {
      parts.push('多张逆位牌的出现表明，当前可能存在一些内在阻碍或是对真相的抗拒');
    } else if (reversedCount === 0) {
      parts.push('所有牌均为正位，这预示着清晰的方向和向前的动力');
    } else if (reversedCount === 1 || reversedCount === 2) {
      parts.push('少数逆位牌的出现提醒您关注某些需要调整的领域');
    }

    // Part 3: Self and partner dynamic
    if (!selfIsReversed && !partnerIsReversed) {
      parts.push('从牌面来看，您和伴侣目前都处于和谐、积极的状态');
    } else if (selfIsReversed && partnerIsReversed) {
      parts.push('您和伴侣似乎都在经历各自的挑战或内在冲突');
    } else {
      parts.push('您与伴侣之间的能量似乎存在某种不平衡');
    }

    // Part 4: Future outlook
    if (futureIsReversed) {
      parts.push('未来位置的逆位告诉我们，最终的结果很大程度上取决于您能否解决当前的阻碍并做出有意识的改变');
    } else {
      parts.push('未来位置呈现出积极的潜力，只要您能够保持觉知，继续走在当前的道路上');
    }

    // Join with proper connectives for smooth narrative flow
    return parts[0] + '。' + parts.slice(1).join('；') + '。';

  } else {
    // English version - using array to collect parts for better flow

    // Part 1: Card type overview
    if (majorArcanaCount >= 3) {
      parts.push('This reading reveals significant spiritual lessons and major life themes in your love life');
    } else if (majorArcanaCount === 0) {
      parts.push('This reading focuses on the practical, day-to-day aspects of your relationship');
    } else {
      parts.push('This reading shows a blend of everyday relationship dynamics and deeper spiritual lessons');
    }

    // Part 2: Reversed cards insight
    if (reversedCount >= 4) {
      parts.push('with many reversed cards appearing, there may be internal blocks or resistance to seeing the full truth');
    } else if (reversedCount === 0) {
      parts.push('all cards appearing upright suggests clarity and forward momentum');
    } else if (reversedCount === 1 || reversedCount === 2) {
      parts.push('a few reversed cards remind you to pay attention to areas that need adjustment');
    }

    // Part 3: Self and partner dynamic
    if (!selfIsReversed && !partnerIsReversed) {
      parts.push('The cards show that both you and your partner are currently in aligned, positive states');
    } else if (selfIsReversed && partnerIsReversed) {
      parts.push('both you and your partner appear to be experiencing your own challenges or internal conflicts');
    } else {
      parts.push('there appears to be some imbalance between your energy and your partner\'s');
    }

    // Part 4: Future outlook
    if (futureIsReversed) {
      parts.push('The reversed future position suggests that outcomes depend heavily on addressing current blocks and making conscious changes');
    } else {
      parts.push('the future position shows positive potential if you continue on your current path with awareness');
    }

    // Join with proper connectives for smooth narrative flow
    return parts[0] + '. ' + parts.slice(1, -1).map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(', ') + ', and ' + parts[parts.length - 1] + '.';
  }
}

// Generate overall analysis synthesizing all cards
export function generateOverallAnalysis(drawnCards, language = 'en') {
  const interpretations = drawnCards.map(card =>
    interpretCard(card, card.position, card.isReversed, language)
  );

  const selfInt = interpretations[0];
  const partnerInt = interpretations[1];
  const pastInt = interpretations[2];
  const presentInt = interpretations[3];
  const futureInt = interpretations[4];

  if (language === 'zh') {
    // Chinese version - using template for better narrative flow
    // Helper function to clean up meanings for better sentence flow
    const cleanMeaning = (text) => text.replace(/[。，！？]$/, '');

    return `在这段关系中，您目前正在经历着${selfInt.card.nameZh}的能量。${cleanMeaning(selfInt.meaning)}。与此同时，您的伴侣正展现出${partnerInt.card.nameZh}的特质，${cleanMeaning(partnerInt.meaning)}。

回顾过去，${pastInt.card.nameZh}揭示了塑造当前局面的根源——${cleanMeaning(pastInt.meaning)}。这段经历为你们现在的关系动态奠定了基础。

在当下这个时刻，${presentInt.card.nameZh}呈现了你们关系的现状：${cleanMeaning(presentInt.meaning)}。这是理解当前处境的关键。

展望未来，${futureInt.card.nameZh}为你们指明了前进的方向。${cleanMeaning(futureInt.meaning)}。

综合来看，这五张牌勾勒出一条清晰的轨迹：从${pastInt.card.nameZh}所代表的过往经历，经由${presentInt.card.nameZh}所揭示的当前状态，最终走向${futureInt.card.nameZh}所预示的未来可能。${selfInt.card.nameZh}和${partnerInt.card.nameZh}这两张牌则分别映照出你们双方在这段旅程中各自的内在状态和能量。`;

  } else {
    // English version - using template for better narrative flow
    // Helper functions to ensure proper sentence structure
    const cleanMeaning = (text) => {
      text = text.trim();
      // Ensure first letter is lowercase for better flow
      return text.charAt(0).toLowerCase() + text.slice(1);
    };
    const capitalize = (text) => text.charAt(0).toUpperCase() + text.slice(1);

    return `In this relationship, you are currently experiencing the energy of ${selfInt.card.name}, which indicates that ${cleanMeaning(selfInt.meaning)}. Meanwhile, your partner is embodying ${partnerInt.card.name}, suggesting that ${cleanMeaning(partnerInt.meaning)}.

Looking at the past, ${pastInt.card.name} reveals the roots that have shaped your current situation. ${capitalize(cleanMeaning(pastInt.meaning))}. This history has laid the foundation for your present relationship dynamic.

In the present moment, ${presentInt.card.name} shows where your relationship stands right now: ${cleanMeaning(presentInt.meaning)}. This is key to understanding your current circumstances.

Looking toward the future, ${futureInt.card.name} points to the direction you're heading. ${capitalize(cleanMeaning(futureInt.meaning))}.

Taking all five cards together, they paint a clear trajectory: from the past experiences represented by ${pastInt.card.name}, through the present reality shown by ${presentInt.card.name}, toward the potential future indicated by ${futureInt.card.name}. ${selfInt.card.name} and ${partnerInt.card.name} reflect the inner states and energies that you and your partner each bring to this journey.`;
  }
}

// Generate actionable advice based on all cards
export function generateActionableAdvice(drawnCards, language = 'en') {
  const adviceList = [];
  const selfCard = drawnCards[0];
  const partnerCard = drawnCards[1];
  const futureCard = drawnCards[4];

  // Collect unique advice from all cards (using correct language)
  drawnCards.forEach(card => {
    const advice = getCardAdvice(card, language);
    if (advice && !adviceList.includes(advice)) {
      adviceList.push(advice);
    }
  });

  if (language === 'zh') {
    // Chinese advice
    if (selfCard.isReversed) {
      adviceList.push('在期待关系改变之前，专注于自我疗愈和自我觉察');
    } else {
      adviceList.push('继续在关系中培养您的正能量和真实自我');
    }

    if (partnerCard.isReversed) {
      adviceList.push('在伴侣应对挑战时，保持耐心和同理心');
    } else {
      adviceList.push('欣赏并回应伴侣带来的正能量');
    }

    if (futureCard.isReversed) {
      adviceList.push('现在采取积极措施来应对路上的潜在障碍');
    } else {
      adviceList.push('相信您的关系正在朝着积极的方向发展');
    }

    adviceList.push('保持关于您的感受和需求的开放和诚实的沟通');
    adviceList.push('记住双方都对关系的动态有所贡献');
  } else {
    // English advice
    if (selfCard.isReversed) {
      adviceList.push('Focus on your own healing and self-awareness before expecting relationship changes');
    } else {
      adviceList.push('Continue nurturing your positive energy and authentic self in the relationship');
    }

    if (partnerCard.isReversed) {
      adviceList.push('Be patient and compassionate with your partner as they work through their challenges');
    } else {
      adviceList.push('Appreciate and reciprocate the positive energy your partner brings');
    }

    if (futureCard.isReversed) {
      adviceList.push('Take proactive steps now to address potential obstacles in your path');
    } else {
      adviceList.push('Trust in the positive direction your relationship is heading');
    }

    adviceList.push('Maintain open and honest communication about your feelings and needs');
    adviceList.push('Remember that both partners contribute to the relationship dynamic');
  }

  return adviceList;
}
