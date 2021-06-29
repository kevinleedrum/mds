import { Component, Host, h, Prop, Event, EventEmitter } from '@stencil/core';
import chevronLeftSvg from '../../assets/svg/chevron-left.svg';
import chevronRightSvg from '../../assets/svg/chevron-right.svg';
import pageFirstSvg from '../../assets/svg/page-first.svg';
import pageLastSvg from '../../assets/svg/page-last.svg';

export type ChangeEventDetail = {
  resultsPerPage: number;
  currentPage: number;
};

@Component({
  tag: 'mx-pagination',
  shadow: false,
})
export class MxPagination {
  @Prop() currentPage: number = 0;
  @Prop() resultsPerPageOptions: number[] = [10, 25, 50, 100];
  @Prop() resultsPerPage: number = 100;
  @Prop() simple: boolean = false;
  @Prop() totalResults: number;

  @Event() mxChange: EventEmitter<ChangeEventDetail>;

  onClickFirstPage() {
    this.mxChange.emit({ currentPage: 0, resultsPerPage: this.resultsPerPage });
  }

  onClickPreviousPage() {
    this.mxChange.emit({ currentPage: this.currentPage - 1, resultsPerPage: this.resultsPerPage });
  }

  onClickNextPage() {
    this.mxChange.emit({ currentPage: this.currentPage + 1, resultsPerPage: this.resultsPerPage });
  }

  onClickLastPage() {
    this.mxChange.emit({ currentPage: this.lastPage, resultsPerPage: this.resultsPerPage });
  }

  onChangeResultsPerPage(resultsPerPage) {
    // Return to first page whenever the results-per-page changes
    this.mxChange.emit({ currentPage: 0, resultsPerPage });
  }

  get lastPage() {
    if (this.totalResults === 0) return 0;
    return Math.ceil(this.totalResults / this.resultsPerPage) - 1;
  }

  get currentRange() {
    let start = this.resultsPerPage * this.currentPage + 1;
    let end = Math.min(this.totalResults, start + this.resultsPerPage - 1);
    return start + '–' + end;
  }

  render() {
    return (
      <Host class="mx-pagination block text-4">
        {this.simple ? (
          // Simple pagination
          <div class="simple flex items-center justify-center h-48">
            <mx-icon-button
              aria-label="Previous page"
              chevron-left
              disabled={this.currentPage === 0}
              onClick={this.onClickPreviousPage.bind(this)}
            />
            {this.currentPage + 1} of {this.lastPage + 1}
            <mx-icon-button
              aria-label="Next page"
              chevron-right
              disabled={this.currentPage === this.lastPage}
              onClick={this.onClickNextPage.bind(this)}
            />
          </div>
        ) : (
          // Standard pagination
          <div class="flex items-center justify-end h-56 space-x-36 px-4">
            <div>
              Rows per page: {this.resultsPerPage}
              {/* TODO: menu */}
            </div>
            {this.totalResults > 0 && (
              <div>
                {this.currentRange} of {this.totalResults}
              </div>
            )}
            <div class="flex space-x-8">
              <mx-icon-button
                aria-label="First page"
                innerHTML={pageFirstSvg}
                disabled={this.currentPage === 0}
                onClick={this.onClickFirstPage.bind(this)}
              />
              <mx-icon-button
                aria-label="Previous page"
                innerHTML={chevronLeftSvg}
                disabled={this.currentPage === 0}
                onClick={this.onClickPreviousPage.bind(this)}
              />
              <mx-icon-button
                aria-label="Next page"
                innerHTML={chevronRightSvg}
                disabled={this.currentPage === this.lastPage}
                onClick={this.onClickNextPage.bind(this)}
              />
              <mx-icon-button
                aria-label="Last page"
                innerHTML={pageLastSvg}
                disabled={this.currentPage === this.lastPage}
                onClick={this.onClickLastPage.bind(this)}
              />
            </div>
          </div>
        )}
      </Host>
    );
  }
}
