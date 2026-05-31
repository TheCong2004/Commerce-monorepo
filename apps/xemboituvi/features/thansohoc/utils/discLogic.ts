import { DISC_RESULTS } from '../data/discInterpretations';
import { DISC_COMBINATIONS } from '../data/discCombinations';
import { PersonalityType } from '../data/discQuestions';

export const getFinalResult = (scores: Record<PersonalityType, number>) => {
  const sorted = Object.entries(scores)
    .sort(([, a], [, b]) => b - a) as [PersonalityType, number][];

  const primary = sorted[0];
  const secondary = sorted[1];

  const primaryType = primary[0];
  const secondaryType = secondary[0];
  const gap = primary[1] - secondary[1];
  const MIXED_THRESHOLD = 3;

  let resultData;
  let isMixed = false;
//Đoạn code bạn gửi chính là trái tim của tính năng "ăn tiền" đó.
  if (gap <= MIXED_THRESHOLD && secondary[1] > 0) {
    const comboCode = `${primaryType}${secondaryType}`;
    const comboProfile = DISC_COMBINATIONS[comboCode];
    if (comboProfile) {
      isMixed = true;
      resultData = {
        title: comboProfile.title,
        description: comboProfile.description,
        baseProfile: DISC_RESULTS[primaryType]
      };
    } else {
      resultData = DISC_RESULTS[primaryType];
    }
  } else {
    resultData = DISC_RESULTS[primaryType];
  }

  return {
    primaryType,
    secondaryType,
    isMixed,
    data: resultData
  };
};
