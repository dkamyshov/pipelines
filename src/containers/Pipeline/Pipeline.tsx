import * as React from 'react';
import * as style from './index.css';
import { createPipelineRunner } from '../../pipelines/runner2';
import { withRouter, RouteComponentProps } from 'react-router-dom';

interface IPipelineOptions {
  initUrl: string;
}

interface IPipelineState {
  ready: boolean;
  tableData: any[];
  selectedRows: number[];
  pipelineData: any;
  error: string | null;
}

class Pipeline extends React.Component<
  {
    options: IPipelineOptions;
  } & RouteComponentProps<any>,
  IPipelineState
> {
  state = {
    ready: false,
    tableData: [],
    selectedRows: [],
    pipelineData: {},
    error: null,
  } as IPipelineState;

  onPipelineError = (error: string) => {
    this.setState({
      error,
    });
  };

  notifyReady = () => {
    console.log('Pipeline done executing!');
  };

  toggleRow = (rowId: number) => {
    const currentRows = this.state.selectedRows;

    if (currentRows.indexOf(rowId) !== -1) {
      this.setState({
        selectedRows: currentRows.filter(cRowId => cRowId !== rowId),
      });
    } else {
      this.setState({
        selectedRows: [...currentRows, rowId],
      });
    }
  };

  setTableData = (data: any[]) => {
    this.setState({
      tableData: data,
      ready: true,
    });
  };

  navigate = (url: string) => {
    this.props.history.push(url);
  };

  componentDidMount() {
    fetch(this.props.options.initUrl)
      .then(response => response.json())
      .then(pipelineData => {
        this.setState(
          {
            pipelineData,
          },
          () => {
            const runner = createPipelineRunner(
              pipelineData.main,
              {
                notifyReady: this.notifyReady,
                setTableData: this.setTableData,
                getCurrentTableData: () => this.state.tableData,
                getCurrentTableSelectedRows: () => this.state.selectedRows,
                navigate: this.navigate,
              },
              this.onPipelineError
            );
            runner.run();
          }
        );
      });
  }

  render() {
    const { ready, tableData, error } = this.state;

    if (error) {
      return (
        <pre
          style={{
            color: 'red',
            border: '1px solid red',
            padding: '4pt',
          }}
        >
          {error}
        </pre>
      );
    }

    if (!ready) {
      return <h2>Пайплайн загружается...</h2>;
    }

    return (
      <div>
        <table className={style['table']}>
          <thead>
            <tr>
              <th>ID</th>
              <th>First name</th>
              <th>Last name</th>
              <th>JS разраб?</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row: any, i) => (
              <tr
                className={
                  this.state.selectedRows.indexOf(row.id) !== -1
                    ? style['selected']
                    : ''
                }
                key={row.id}
                onClick={() => this.toggleRow(row.id)}
              >
                <td>{row.id}</td>
                <td>{row.firstName}</td>
                <td>{row.lastName}</td>
                <td>{row.isJSDeveloper}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {Object.keys(this.state.pipelineData)
          .filter(key => key !== 'main')
          .map(key => {
            const action = this.state.pipelineData[key];

            return (
              <button
                className={style['button']}
                key={action.name}
                onClick={() => {
                  const runner = createPipelineRunner(
                    action.description,
                    {
                      notifyReady: this.notifyReady,
                      setTableData: this.setTableData,
                      getCurrentTableData: () => this.state.tableData,
                      getCurrentTableSelectedRows: () =>
                        this.state.selectedRows,
                      navigate: this.navigate,
                    },
                    this.onPipelineError
                  );

                  runner.run();
                }}
              >
                {action.name}
              </button>
            );
          })}
      </div>
    );
  }
}

export default withRouter(Pipeline);
