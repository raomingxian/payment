/**
 * It can sometimes be useful to get the average of data in an API result set,
 * be it from a column, or a collection of cells. This method provides exactly
 * that ability.
 *
 *  @name average()
 *  @summary Average the values in a data set.
 *  @author [Allan Jardine](http://sprymedia.co.uk)
 *  @requires DataTables 1.10+
 *
 * @returns {Number} Calculated average
 *
 *  @gfcz
 *    // Average a column
 *    var table = $('#gfcz').DataTable();
 *    table.column( 3 ).data().average();
 *
 *  @gfcz
 *    // Average two cells
 *    var table = $('#gfcz').DataTable();
 *    table.cells( 0, [3,4] ).data().average();
 */

jQuery.fn.dataTable.Api.register( 'average()', function () {
    var data = this.flatten();
    var sum = data.reduce( function ( a, b ) {
        return (a*1) + (b*1); // cast values in-case they are strings
    } );
 
    return sum / data.length;
} );

