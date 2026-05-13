const generate = async (month, dueDate, createdBy) => {
    const [result] = await db.query(
        "CALL sp_generate_maintenance(?,?,?)",
        [month, dueDate, createdBy]
    );

    /* 
       result[0] will look something like:
       { 
         fieldCount: 0, 
         affectedRows: 15,  <-- This tells you how many flats were billed
         insertId: 0, 
         info: 'Records: 15  Duplicates: 0  Warnings: 0',
         serverStatus: 2 
       }
    */
    return result[0]; 
};