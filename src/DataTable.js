import yaml from 'js-yaml';
import React, { useState, useEffect, useMemo } from 'react';
import { useTable, useSortBy } from 'react-table';

function DataTable() {
    const [data, setData] = useState([]);
  
    useEffect(() => {
      fetch('/config/schema.yaml')
          .then(response => response.text())
          .then(yamlStr => {
              const parsedData = yaml.load(yamlStr);
              if (Array.isArray(parsedData)) {
                  setData(parsedData);
              } else {
                  console.error("Parsed data is not an array:",parsedData);
              }
          })
          .catch(e => console.error("Error loading YAML:", e));
  }, []);
  
  const columns = useMemo(() => [
    {
        Header: 'Model',
        columns: [
            {
              Header: 'Name',
              accessor: 'name',
            }
          ],
    
    },
    {
        Header: 'Data',
        columns: [
            {
              Header: 'Dataset',
              accessor: 'data.dataset',
            },
            {
              Header: 'Tokenizer',
              accessor: 'data.tokenizer',
            }
          ],
    },
    {
        Header: 'Architecture',
        columns: [
            {
                Header: 'Normalization',
                accessor: 'architecture.normalization'
            },
            {
                Header: 'Parallel Layers',
                accessor: 'architecture.parallel_layers'
            },
            {
                Header: 'Biases',
                accessor: 'architecture.biases'
            },
            {
                Header: 'Activation Function',
                accessor: 'architecture.activation_function'
            },
            {
                Header: 'D Attn / D FF',
                accessor: 'architecture.d_attn_d_ff'
            },
            {
                Header: 'Optimizer',
                accessor: 'architecture.optimizer'
            },
            {
                Header: 'Optimizer Hyperparameters',
                accessor: 'architecture.optimizer_hyperparams'
            },
            {
                Header: 'Embeddings',
                accessor: 'architecture.embeddings'
            }
          ],
    },
    {
        Header: 'Optimization',
        columns: [
            {
                Header: 'LR Warmup',
                accessor: 'optimization.lr_warmup'
            },
            {
                Header: 'LR Decay',
                accessor: 'optimization.lr_decay'
            },
            {
                Header: 'Precision',
                accessor: 'optimization.precision'
            },
            {
                Header: 'Clipping',
                accessor: 'optimization.clipping'
            },
            {
                Header: 'Dropout',
                accessor: 'optimization.dropout'
            },
            {
                Header: 'Weight Decay',
                accessor: 'optimization.weight_decay'
            }
          ],
    },
    {
        Header: 'Misc',
        columns: [
            {
                Header: 'Training Library',
                accessor: 'misc.training_library'
            },
            {
                Header: 'Date',
                accessor: 'misc.date'
            },
            {
                Header: 'Source',
                accessor: 'misc.source'
            }
          ],
    },
  ], []);
  
      const tableInstance = useTable({ columns, data }, useSortBy);
  
      const {
          getTableProps,
          getTableBodyProps,
          headerGroups,
          rows,
          prepareRow,
      } = tableInstance;
  
    return (
      <>
      <h1><center>Common LLM Setings</center></h1>
      <div className="table-container">
      <table {...getTableProps()} className="table table-striped table-hover">
          <thead>
              {headerGroups.map(headerGroup => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map(column => (
                          <th {...column.getHeaderProps(column.getSortByToggleProps())} style={{ textAlign: 'center' }}>
                              {column.render('Header')}
                              <span>
                                  {column.isSorted
                                      ? column.isSortedDesc
                                          ? ' 🔽'
                                          : ' 🔼'
                                      : ''}
                              </span>
                          </th>
                      ))}
                  </tr>
              ))}
          </thead>
          <tbody {...getTableBodyProps()}>
              {rows.map(row => {
                  prepareRow(row);
                  return (
                      <tr {...row.getRowProps()}>
                          {row.cells.map(cell => {
                              return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                          })}
                      </tr>
                  );
              })}
          </tbody>
          </table>
         
          
    </div>
    
          <div className="table-container">
          <div class="container mt-5">
        <div class="row justify-content-end">
            <div class="col-auto">
                <a href="https://github.com/username/repo/edit/main/path/to/your/file.html" class="btn btn-primary">
                    Edit on GitHub
                </a>
            </div>
        </div>
    </div>
            <h2> Notes</h2>
              <p>Many papers say that they follow another paper except for some changes. When such a paper doesn't mention a config, we assume it's the same as the previous paper unless there's a specific reason to not do so.
  Assumed values, whether because of the above principle or because they've been inferred from materials but not explicitly stated, are in italics
  <br></br>
  My primary goal is to document best practices and how they evolve over time. Therefore if something was supposed to be done but failed to due to a bug, I list what was intended.
  All such examples have a note disclaiming them when they occur
  <br></br>
  There are close to 100 LMs that have been trained in the past three years. For ease of use I've been focusing on what I consider to be central examples that people look to to inform their decision-making.
  If there are models you'd like added, feel free to leave a comment!
  
  Some of this info has been divined from staring at model inference code for a long time. I'm reasonably confidant it's correct, but please comment with any corrections (w/ a source!) 
  </p>
  
              </div>
          </>
      );
  }
  
  
  export default DataTable;