import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import moment from 'moment';
import {
  Typography, Row, Col, Select, Radio, Icon,
} from 'antd';
import {
  FlexibleWidthXYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
  LineSeries,
  Crosshair,
  DiscreteColorLegend,
} from 'react-vis';

import GET_BENCHMARK from '../../actions/BenchmarkActions';

const mapStateToProps = (store) => ({
  benchmark: store.benchmark,
});

const { Title, Text } = Typography;
const { Option } = Select;

class PortfolioBenchmark extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      crosshairValues: [],
      graphData: [],
      currency: 'SGD',
      conversionRate: 0.72,
      duration: '1mo',
      fromDate: '',
      benchmarkComparison: null,
      showError: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.onNearestX = this.onNearestX.bind(this);
    this.changeCurrency = this.changeCurrency.bind(this);
    this.changeDuration = this.changeDuration.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    const initialDate = moment().subtract(1, 'months').format('MM/DD/YYYY');

    dispatch(GET_BENCHMARK(null, initialDate));

    this.setState({
      fromDate: initialDate,
    });
  }

  componentWillReceiveProps({ benchmark }) {
    if (Array.isArray(benchmark.portfolio_benchmark)) {
      const graphData = benchmark.portfolio_benchmark.map((a) => ({
        id: a.id,
        name: a.name,
        desc: a.desc,
        data: a.data.map((item) => ({
          x: item.date,
          y: item.amt,
        })),
      }));

      this.setState({
        graphData,
        showError: false,
      });
    } else {
      this.setState({
        showError: true,
      });
    }
  }

  onMouseLeave() {
    this.setState({ crosshairValues: [] });
  }

  onNearestX(value, { index }) {
    const { graphData } = this.state;

    const crossHair = graphData.map((a) => a.data);

    this.setState({ crosshairValues: crossHair.map((d) => d[index]) });
  }

  handleChange(value) {
    const { dispatch } = this.props;
    const { fromDate } = this.state;

    dispatch(GET_BENCHMARK(value, fromDate));

    this.setState({
      benchmarkComparison: value,
    });
  }

  changeCurrency(e) {
    const { graphData, conversionRate } = this.state;

    const newGraphData = graphData.map((a) => ({
      id: a.id,
      name: a.name,
      desc: a.desc,
      data: a.data.map((item) => ({
        x: item.x,
        y: (e.target.value === 'USD' ? item.y * conversionRate : item.y / conversionRate),
      })),
    }));

    this.setState({
      graphData: newGraphData,
      currency: e.target.value,
    });
  }

  changeDuration(e) {
    let fromDateParam;

    const { dispatch } = this.props;
    const { benchmarkComparison, fromDate } = this.state;

    switch (e.target.value) {
    case '1mo':
      fromDateParam = moment().subtract(1, 'months').format('MM/DD/YYYY');
      break;
    case '6mos':
      fromDateParam = moment().subtract(6, 'months').format('MM/DD/YYYY');
      break;
    case 'yrtodate':
      fromDateParam = `01/01/${moment().year()}`;
      break;
    case '1yr':
      fromDateParam = moment().subtract(12, 'months').format('MM/DD/YYYY');
      break;
    case '5yrs':
      fromDateParam = moment().subtract(60, 'months').format('MM/DD/YYYY');
      break;
    case 'max':
      fromDateParam = '01/01/1970';
      break;
    default:
      fromDateParam = moment().subtract(1, 'months').format('MM/DD/YYYY');
    }

    this.setState({
      duration: e.target.value,
      fromDate: fromDateParam,
    }, () => {
      dispatch(GET_BENCHMARK(benchmarkComparison, fromDate));
    });
  }

  render() {
    const {
      crosshairValues, graphData, currency, duration, showError,
    } = this.state;
    const chartLegend = graphData ? graphData.map((g) => g.desc) : [];
    const children = [
      <Option key="2" value="2">40% VTSMX (Stock) + 60% VTBMX (Bond)</Option>,
      <Option key="3" value="3">20% VTSMX (Stock) + 80% VTBMX (Bond)</Option>,
    ];

    return (
      <div id="portfolio-benchmark">
        <div className="container">
          <div className="fullcontent">
            <Title level={3}>Portfolio Benchmark</Title>

            <div className="vs">
              <div className="compare">VS</div>
              <Row>
                <Col sm={24} md={12} className="investing">
                  <Text className="label">General Investing</Text>
                  <Title level={4}>StashAway Risk Index 14%</Title>
                </Col>
                <Col sm={24} md={12} className="benchmark">
                  <Select
                    showArrow
                    style={{ width: '100%' }}
                    placeholder="Which benchmark do you want to compare?"
                    defaultActiveFirstOption
                    onChange={this.handleChange}
                  >
                    {children}
                  </Select>
                </Col>
              </Row>
            </div>

            <div className="graph-option">
              <Row>
                <Col span={20} className="duration">
                  <Radio.Group defaultValue={duration} buttonStyle="solid" onChange={this.changeDuration}>
                    <Radio.Button value="1mo">1 month</Radio.Button>
                    <Radio.Button value="6mos">6 months</Radio.Button>
                    <Radio.Button value="yrtodate">Year-to-date</Radio.Button>
                    <Radio.Button value="1yr">1 year</Radio.Button>
                    <Radio.Button value="5yrs">5 years</Radio.Button>
                    <Radio.Button value="max">Max</Radio.Button>
                  </Radio.Group>
                </Col>
                <Col span={4} className="currency">
                  <Radio.Group defaultValue={currency} buttonStyle="solid" onChange={this.changeCurrency}>
                    <Radio.Button value="SGD">SGD</Radio.Button>
                    <Radio.Button value="USD">USD</Radio.Button>
                  </Radio.Group>
                </Col>
              </Row>
            </div>

            {showError
              && (
                <Text className="error-msg">
                  <Icon type="close-circle" />
                  {' '}
                  Data cannot be loaded right now. Please try again later.
                </Text>
              )}

            <div className="graph">
              <Title level={4}>Portfolio value based on gross returns</Title>
              <Text>
                Gross Returns and exchange rates sourced from Bloomberg as of 2nd May 2019
              </Text>
              <FlexibleWidthXYPlot
                height={300}
                xType="ordinal"
                margin={{ left: 75, bottom: 70 }}
                onMouseLeave={this.onMouseLeave}
              >
                <HorizontalGridLines />
                <XAxis
                  tickLabelAngle={-70}
                  style={{
                    ticks: { stroke: '#BCBCBC' },
                    text: { stroke: 'none', fill: '#BCBCBC' },
                  }}
                  tickFormat={(value) => moment(value).format('MMMDD')}
                  tickSizeOuter={6}
                />
                <YAxis
                  hideLine
                  left={-20}
                  style={{
                    line: { stroke: 'none' },
                    ticks: { stroke: '#BCBCBC' },
                    text: { stroke: 'none', fill: '#BCBCBC' },
                  }}
                />
                <LineSeries
                  data={graphData[0] ? graphData[0].data : []}
                  color="#45BCE1"
                  onNearestX={this.onNearestX}
                  animation
                />
                <LineSeries
                  data={graphData[1] ? graphData[1].data : []}
                  color="#eeb749"
                  animation
                />
                {crosshairValues.length > 0
                  && (
                    <Crosshair values={crosshairValues}>
                      <div className="crosshair">
                        <p className="date">
                          {moment(crosshairValues[0].x).format('DD MMM YYYY')}
                        </p>
                        <p className="label">
                          <span className="square sky-blue" />
                          {graphData[0] ? graphData[0].name : ''}
                        </p>
                        <p className="amt">
                          $
                          {crosshairValues[0].y.toLocaleString()}
                          {currency}
                        </p>
                        {crosshairValues[1]
                          && (
                            <div>
                              <p className="label">
                                <span className="square yellow" />
                                {graphData[1] ? graphData[1].name : ''}
                              </p>
                              <p className="amt">
                                $
                                {crosshairValues[1] ? crosshairValues[1].y.toLocaleString() : ''}
                                {currency}
                              </p>
                            </div>
                          )}

                      </div>
                    </Crosshair>
                  )}
              </FlexibleWidthXYPlot>
              <DiscreteColorLegend
                colors={[
                  '#45BCE1',
                  '#EEB749',
                ]}
                items={chartLegend}
                orientation="horizontal"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

PortfolioBenchmark.propTypes = {
  benchmark: PropTypes.shape({
    portfolio_benchmark: PropTypes.array,
  }),
  dispatch: PropTypes.func,

};

PortfolioBenchmark.defaultProps = {
  benchmark: null,
  dispatch: null,
};

export default connect(mapStateToProps)(PortfolioBenchmark);
