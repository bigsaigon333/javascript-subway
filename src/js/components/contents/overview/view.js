import requestReadLine from '../lines/read.js';
import { getSectionList } from '../sections/getSubwayData.js';
import { OVERVIEW_TEMPLATE, SECTION_LIST_ITEM_TEMPLATE } from './template.js';

const $wrapper = document.createElement('div');
$wrapper.classList.add('wrapper', 'bg-white', 'p-10', 'overview');
$wrapper.innerHTML = OVERVIEW_TEMPLATE;

const $sectionList = $wrapper.querySelector('.section-list');

// eslint-disable-next-line import/prefer-default-export
export async function renderOverview($main) {
  const totalLineList = await requestReadLine();
  const totalSectionList = totalLineList.map(({ id, name, color }) => {
    const sectionList = getSectionList(totalLineList, id);
    const { distance, duration } = sectionList.reduce(
      (acc, curr) => ({ distance: acc.distance + curr.distance, duration: acc.duration + curr.duration }),
      { distance: 0, duration: 0 }
    );

    return { name, color, distance, duration, sectionList };
  });

  $sectionList.innerHTML = totalSectionList.map(SECTION_LIST_ITEM_TEMPLATE).join('');

  $main.replaceChildren($wrapper);
}
