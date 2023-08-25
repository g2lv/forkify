import View from './view.js';
import icons from 'url:../../img/icons.svg'; // import icons for Parcel packager

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const gotoPage = parseInt(btn.dataset.goto);

      handler(gotoPage);
    });
  }
  _generateMarkup() {
    const curPage = this._data.page;
    const prevPage = curPage - 1;
    const nextPage = curPage + 1;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    const prevBtnMarkup = `
    <button data-goto="${prevPage}" class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${prevPage}</span>
    </button>`;

    const nextBtnMarkup = `
    <button data-goto="${nextPage}" class="btn--inline pagination__btn--next">
      <span>Page ${nextPage}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>`;

    // page 1 and there are other pages
    if (curPage === 1 && numPages > 1) return nextBtnMarkup;

    // last page
    if (this._data.page === numPages && numPages > 1) return prevBtnMarkup;

    // other pages
    if (this._data.page < numPages) {
      return prevBtnMarkup + nextBtnMarkup;
    }

    // page 1 and no other pages
    return;
  }
}

export default new PaginationView();
