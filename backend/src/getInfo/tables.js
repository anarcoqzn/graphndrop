const oracledb = require('oracledb');
const dbconfig = require('../../dbconfig');

module.exports = {
  async getUserDependencies(_, res) {
    let connection;
    try {
      const tables_dependencies = [];
      connection = await oracledb.getConnection(dbconfig.config);
      
      const r_constraints = await connection.execute(
        `select constraint_name, table_name,r_constraint_name from USER_CONSTRAINTS where constraint_type='R'`
      );

      const user_cons_columns = await connection.execute(
        `select constraint_name, table_name, column_name from user_cons_columns`
      );
      const cons_name_index = r_constraints.metaData.findIndex(obj => (obj.name === 'CONSTRAINT_NAME'));
      const r_cons_name_index = r_constraints.metaData.findIndex(obj => (obj.name === 'R_CONSTRAINT_NAME'));
      
      const u_cons_name_index = user_cons_columns.metaData.findIndex(obj => (obj.name === 'CONSTRAINT_NAME'));
      const u_table_name_index = user_cons_columns.metaData.findIndex(obj => (obj.name === 'TABLE_NAME'));
      const u_column_name_index = user_cons_columns.metaData.findIndex(obj => (obj.name === 'COLUMN_NAME'));

      r_constraints.rows.forEach(constraint => {
        const target = user_cons_columns.rows.find(obj =>
          (obj[u_cons_name_index] === constraint[r_cons_name_index]));
        
        const from = user_cons_columns.rows.find(obj =>
          (obj[u_cons_name_index] === constraint[cons_name_index]))
        
        tables_dependencies.push({
          'constraint_name': constraint[cons_name_index],
          'from': {
            'table': from[u_table_name_index],
            'column':from[u_column_name_index]
          },
          'to': {
            'table': target[u_table_name_index],
            'column': target[u_column_name_index],
          }
        })
      });

      return res.json(tables_dependencies);
    } catch (error) {
      return res.send(error);
    } finally {
      try {
        if (connection) await connection.close();
      } catch (error) {
        return res.send(error);
      }
    }
  }
}