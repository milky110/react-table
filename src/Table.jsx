import classNames from 'classnames';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from './index.styl';
import TableTemplate from './TableTemplate';

class Table extends PureComponent {
    static propTypes = {
        averageColumnsWidth: PropTypes.bool,
        bordered: PropTypes.bool,
        columns: PropTypes.array,
        data: PropTypes.array,
        emptyText: PropTypes.func,
        expandedRowKeys: PropTypes.array,
        expandedRowRender: PropTypes.func,
        footer: PropTypes.func,
        height: PropTypes.number,
        hoverable: PropTypes.bool,
        loading: PropTypes.bool,
        onRowClick: PropTypes.func,
        showHeader: PropTypes.bool,
        sortable: PropTypes.bool,
        title: PropTypes.func,
        useFixedHeader: PropTypes.bool,
        rowClassName: PropTypes.func,
        rowKey: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
    };
    static defaultProps = {
        data: [],
        bordered: true,
        hoverable: true,
        loading: false,
        sortable: false,
        useFixedHeader: false
    };

    mainTable = null;

    state = this.getInitState();

    actions = {
        detectScrollTarget: (e) => {
            if (this.scrollTarget !== e.currentTarget) {
                this.scrollTarget = e.currentTarget;
            }
        },
        handleBodyScroll: (e) => {
            if (e.target !== this.scrollTarget) {
                return;
            }
            this.setState({
                scrollTop: e.target.scrollTop
            });
        },
        handleRowHover: (isHover, key) => {
            const { hoverable } = this.props;
            if (hoverable) {
                this.setState({
                    currentHoverKey: isHover ? key : null
                });
            }
        }
    };

    getInitState () {
        return {
            currentHoverKey: null,
            scrollTop: 0
        };
    }

    leftColumns() {
        const { columns } = this.props;
        const fixedColumns = columns.filter((column) => {
            return column.fixed === true;
        });
        const lastFixedColumn = fixedColumns[fixedColumns.length - 1];
        const lastFixedIndex = columns.lastIndexOf(lastFixedColumn);
        return columns.filter((column, index) => {
            return index <= lastFixedIndex;
        });
    }

    isAnyColumnsLeftFixed() {
        const { columns } = this.props;
        return columns.some((column) => {
            return column.fixed === true;
        });
    }

    renderTable() {
        const { currentHoverKey, scrollTop } = this.state;
        const { detectScrollTarget, handleBodyScroll, handleRowHover } = this.actions;
        return (
            <TableTemplate
                {...this.props}
                currentHoverKey={currentHoverKey}
                onMouseOver={detectScrollTarget}
                onRowHover={handleRowHover}
                onTouchStart={detectScrollTarget}
                onScroll={handleBodyScroll}
                scrollTop={scrollTop}
                ref={node => {
                    this.mainTable = node;
                }}
            />
        );
    }

    renderFixedLeftTable() {
        const { currentHoverKey, scrollTop } = this.state;
        const { detectScrollTarget, handleBodyScroll, handleRowHover } = this.actions;
        let fixedColumns = this.leftColumns();
        return (
            <TableTemplate
                {...this.props}
                columns={fixedColumns}
                currentHoverKey={currentHoverKey}
                className={styles.tableFixedLeftContainer}
                isFixed={true}
                onMouseOver={detectScrollTarget}
                onRowHover={handleRowHover}
                onTouchStart={detectScrollTarget}
                onScroll={handleBodyScroll}
                scrollTop={scrollTop}
                ref={node => {
                    this.tableFixedLeft = node;
                }}
            />
        );
    }

    renderTitle() {
        const { title } = this.props;
        return (
            <div className={styles.title}>
                {title()}
            </div>
        );
    }

    renderFooter () {
        const { footer } = this.props;
        return (
            <div className={styles.tfoot}>
                {footer()}
            </div>
        );
    }

    renderLoader() {
        return (
            <div className={styles.loaderOverlay}>
                <span className={classNames(styles.loader, styles.loaderLarge)} />
            </div>
        );
    }

    render() {
        const {
            loading,
            bordered,
            title,
            footer,
            averageColumnsWidth,
            hoverable,
            sortable,
            useFixedHeader,
            ...props
        } = this.props;

        return (
            <div
                className={classNames(
                    styles.tableWrapper,
                    { [styles.tableMinimalism]: !bordered },
                    { [styles.tableBordered]: bordered },
                    { [styles.tableExtendColumnWidth]: !averageColumnsWidth },
                    { [styles.tableFixedHeader]: useFixedHeader },
                    { [styles.tableNoData]: !props.data || props.data.length === 0 },
                    { [styles.tableHover]: hoverable },
                    { [styles.tableSortable]: sortable }
                )}
                ref={(node) => {
                    this.tableWrapper = node;
                }}
            >
                { title && this.renderTitle() }
                { this.renderTable() }
                { this.isAnyColumnsLeftFixed() && this.renderFixedLeftTable() }
                { loading && this.renderLoader() }
                { footer && this.renderFooter() }
            </div>
        );
    }
}

export default Table;
