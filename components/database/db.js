import React from 'react';
import * as SQLite from 'expo-sqlite';
import storeObject from "../../store/store";


const db = SQLite.openDatabase("ljdbtest64.db");


class database {
     constructor() {
        (async()=>{
            console.log('DB Cons');
        this.state = {};
        await db.transaction(tx => {
            tx.executeSql(
                "create table if not exists books (id integer primary key AUTOINCREMENT, name text NOT NULL, trashed integer, password text, remoteid text);", [],
                (tx, results) => {
                    // console.log('Books Table Create Results : ', results);

                }
            );
        });
        await db.transaction(tx => {
            tx.executeSql(
                "create table if not exists firstuse (firstuse integer primary key, remoteid text);", [],
                (tx, results) => {
                    db.transaction(tx => {
                        tx.executeSql(
                            "INSERT INTO firstuse (firstuse) VALUES (1)" ,
                            [],
                            (tx, results) => {

                                // console.log('Languages Table Create Results : ', results);
                                }, (t, error) => {
                                    // console.log(' Languages Constructor error : ', error)

                                }
                                );
                            });
                    // console.log('Books Table Create Results : ', results);

                }
            );
        });

        await db.transaction(tx => {
            tx.executeSql(
                "create table if not exists binpass (firstuse integer primary key, binpass text, remoteid text);", [],
                (tx, results) => {
                    db.transaction(tx => {
                        tx.executeSql(
                            "INSERT INTO binpass (firstuse) VALUES (1)" ,
                            [],
                            (tx, results) => {

                                // console.log('Languages Table Create Results : ', results);
                                }, (t, error) => {
                                    // console.log(' Languages Constructor error : ', error)

                                }
                                );
                            });
                    // console.log('Books Table Create Results : ', results);

                }
            );
        });





        await db.transaction(tx => {
            tx.executeSql(
                "create table if not exists personals (id integer PRIMARY KEY, fullname text, phone_no text, auth_token text, active integer, language text, currency text, tagline char(50), shopaddress char(50), email text, first_sign_in text, last_sign_in text, photourl text, isemailverified integer, uid text, currentbook integer, UPIID text, remoteid text);", [],
                (tx, results) => {
                    // console.log('Personals Table Create Results : ', results);

                }
            );
        });
        // not using
        await db.transaction(tx => {
            //         tx.executeSql(
            //     "DROP table loanname;",
            //     [],
            //     (tx, results) => {
            //         // console.log('Record table query success Results', results);
            //     }, (t, error) => {
            //         // console.log('Constructor error : ', error)
            //     }
            // );
            tx.executeSql(
                "create table if not exists loanname (id integer primary key AUTOINCREMENT, name text, isactive integer, lastupdated text NOT NULL, contactname text, contactno text, bookid integer, remoteid text);", [],
                (tx, results) => {
                    // console.log('Personals Table Create Results : ', results);

                }
            );
        });



        await db.transaction(tx => {
            tx.executeSql(
                "INSERT INTO personals (id, language, currency) VALUES (1, 'english', 'USD')", [],
                (tx, results) => {
                    console.log('Personals Table Value Inserted Results : ', results);

                }, (t, error) => {
                    // console.log('Constructor error : ', error)
                }
            );
        });

        await db.transaction(tx => {
            //         tx.executeSql(
            //     "DROP table records;",
            //     [],
            //     (tx, results) => {
            //         // console.log('Record table query success Results', results);
            //     }, (t, error) => {
            //         // console.log('Constructor error : ', error)
            //     }
            // );
            tx.executeSql(
                "create table if not exists records (recordid integer, txid text, book_id integer, amount integer, date text, duedate text, give integer, take integer, attachment text, remarks text, partner_contact text, uploaded integer, phoneid integer, type text, remoteid text);",
                [],
                (tx, results) => {
                    // console.log('Record table query success Results', results);
                }, (t, error) => {
                    // console.log('Constructor error : ', error)
                }
            );
        });

        await db.transaction(tx => {
            // tx.executeSql(
            //     "DROP table contactwithrecords;",
            //     [],
            //     (tx, results) => {
            //         // console.log('Record table query success Results', results);
            //     }, (t, error) => {
            //         // console.log('Constructor error : ', error)
            //     }
            // );



            tx.executeSql(
                "create table if not exists contactwithrecords (recordid integer primary key AUTOINCREMENT, contact text NOT NULL, bookid integer NOT NULL,name text NOT NULL, lastupdated text NOT NULL, loanYes integer, address text, rAmount integer, pAmount integer, netAmount integer, remoteid text, hasGaveGot integer, hasRecievableDue integer,isDeleted integer DEFAULT 0,isActive integer DEFAULT 1,isSms integer DEFAULT 1,limitGave integer DEFAULT 10000,limitGot integer DEFAULT 5000);",
                [],
                (tx, results) => {
                    // console.log('Record table query success Results', results);
                }, (t, error) => {
                    // console.log('Constructor error : ', error)
                }
            );
        });

        await db.transaction(tx => {
            //      tx.executeSql(
            //     "DROP table loanrecords;",
            //     [],
            //     (tx, results) => {
            //         // console.log('Record table query success Results', results);
            //     }, (t, error) => {
            //         // console.log('Constructor error : ', error)
            //     }
            // );
            tx.executeSql(
                
                "create table if not exists loanrecords (recordid integer primary key AUTOINCREMENT,txid text, customername text, bookId integer, amountTaken integer DEFAULT 0,amountGiven integer DEFAULT 0, date text, duedate text,lastupdated text NOT NULL, give integer, take integer, attachment text, remarks text, contactno text, uploaded integer, interest integer, type text, mode text, installment integer, totalMonths integer, loanName text, installmentAmount text,isactive integer, remoteid text);",
                [],
                (tx, results) => {
                    // console.log('Loan table query success Results', results);
                }, (t, error) => {
                    // console.log('Constructor error : ', error)
                }
            );
        });
        // BUSINESS_NAME: "Lekha Jokha",
        // USER_NAME:"charlie",
        // PH_NO:9999999999,
        // BUSINESS_TYPE:"Aluminium casting",
        // ADDRESS:"Earth",
        // EMAIL:"lekhajhokadb@gmail.com"
        await db.transaction(tx => {
            
            //        tx.executeSql(
            //     "DROP table visitingrecords;",
            //     [],
            //     (tx, results) => {
            //         // console.log('Record table query success Results', results);
            //     }, (t, error) => {
            //         // console.log('Constructor error : ', error)
            //     }
            // );

            tx.executeSql(
                "create table if not exists visitingrecords (recordid integer primary key AUTOINCREMENT,BUSINESS_NAME text, USER_NAME text, PH_NO integer, GST_NO text, BUSINESS_TYPE text, ADDRESS text, EMAIL text,DESIGNATION text);",
                [],
                (tx, results) => {
                    // console.log('Loan table query success Results', results);
                }, (t, error) => {
                    // console.log('Constructor error : ', error)
                }
            );
        });

        // db.transaction(tx => {
        //     tx.executeSql(
        //         "create table if not exists contactwithrecordsloan (recordid integer primary key AUTOINCREMENT, contact text NOT NULL, bookid integer NOT NULL,name text NOT NULL, lastupdated text NOT NULL);",
        //         [],
        //         (tx, results) => {
        //             // console.log('Record table query success Results', results);
        //         }, (t, error) => {
        //             // console.log('Constructor error : ', error)
        //         }
        //     );
        // });

        // db.transaction(tx => {
        //   tx.executeSql(
        //     "INSERT INTO records (recordid) VALUES (1)",
        //     [],
        //     (tx, results) => {
        //       console.log('Record table query success Results', results);
        //     }, (t, error) => {
        //         console.log('Constructor error : ', error)
        //     }
        //   );
        // });



    })()
}

    checkifbinisfirsttime(){
        return new Promise((resolve, reject) =>{
            db.transaction(tx => {
                tx.executeSql(
                    "SELECT * FROM binpass",
                    [],
                    (tx, results) => {
                        resolve(results)
                        // conssole.log('setrecord : Results', results);
                    }, (t, error) => {
                        reject(error)
                        // console.log('setrecord : error : ', error)
                    }
                );
            });
        })
    }

    setBinPassword(pass){
        return new Promise((resolve, reject) =>{
        db.transaction(tx => {
            tx.executeSql(
                "UPDATE binpass SET binpass='"+pass+"', firstuse=0 WHERE firstuse=1",
                [],
                (tx, results) => {
                                            resolve(results)

                    // console.log('setrecord : Results', results);
                }, (t, error) => {
                                            reject(error)

                    // console.log('setrecord : error : ', error)
                }
            );
        });
         })
    }

    getVisitingCard(){
        return new Promise((resolve, reject) =>{
        db.transaction(tx => {
            tx.executeSql(
                "SELECT * from visitingrecords",
                [],
                (tx, results) => {
                    // console.log('data',results)
                                            resolve(results.rows)

                    // console.log('setrecord : Results', results);
                }, (t, error) => {
                                            reject(error)

                    // console.log('setrecord : error : ', error)
                }
            );
        });
         })
    }



    setVisitingCard(BUSINESS_NAME , USER_NAME , PH_NO ,GST_NO, BUSINESS_TYPE , ADDRESS , EMAIL,DESIGNATION ){
        return new Promise((resolve, reject) =>{

            db.transaction(tx => {
                tx.executeSql(
                   
                    "INSERT INTO visitingrecords (BUSINESS_NAME,USER_NAME,PH_NO,GST_NO,BUSINESS_TYPE,ADDRESS,EMAIL,DESIGNATION) VALUES ( '" + BUSINESS_NAME + "','" + USER_NAME + "'," + PH_NO + ", '" +GST_NO+"', '"+ BUSINESS_TYPE + "', '" + ADDRESS + "', '" + EMAIL +"','"+DESIGNATION+"')",
                    //  ( 'BUSINESS_NAME ',' USER_NAME ',458, 'GST_NO', 'BUSINESS_TYPE ','ADDRESS', 'EMAI','DESIGNATION')",
                    // ('" + BUSINESS_NAME + "','" + USER_NAME + "'," + PH_NO + ", '" +GST_NO+"', '"+ BUSINESS_TYPE + "', '" + ADDRESS + "', '" + EMAIL +"','"+DESIGNATION+"')",
                    [],
                    (tx, results) => {
    
                        console.log('setrecord : Results', results.rows);
                        resolve(results.rows)
                    }, (t, error) => {
                        console.log('setrecord : error : ', error)
                    }
                );
            });

         })
    }




    checkBinPassword(password){
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    "SELECT * FROM binpass WHERE firstuse=0", [],
                    (tx, results) => {

                        console.log("checking " + results.rows.item(0).binpass +" with " + password )

                        if(results.rows.item(0).binpass===password){
                            resolve(1)
                        }else{
                            resolve(0)
                        }


                    }, (t, error) => {
                        console.log('Constructor error : ', error)
                        reject(error)
                    }
                );
            });
        })
    }

    setRemoteIdLoanName(name, remoteid){//se
        db.transaction(tx => {
            tx.executeSql(
                "UPDATE loanname SET remoteid='"+remoteid+"' WHERE name='"+name+"'",
                [],
                (tx, results) => {
                    // console.log('setrecord : Results', results);
                }, (t, error) => {
                    // console.log('setrecord : error : ', error)
                }
            );
        });
    }
     setRemoteIdLoanRecords(recordid, remoteid){
        db.transaction(tx => {
            tx.executeSql(
                "UPDATE loanrecords SET remoteid='"+remoteid+"' WHERE recordid="+recordid,
                [],
                (tx, results) => {
                    // console.log('setrecord : Results', results);
                }, (t, error) => {
                    // console.log('setrecord : error : ', error)
                }
            );
        });
    }
    setRemoteIdRecord(recordid, remoteid){
        db.transaction(tx => {
            tx.executeSql(
                "UPDATE records SET remoteid='"+remoteid+"' WHERE recordid="+recordid,
                [],
                (tx, results) => {
                    // console.log('setrecord : Results', results);
                }, (t, error) => {
                    // console.log('setrecord : error : ', error)
                }
            );
        });
    }

    setRemoteIdContactWithRecord(recordid, remoteid){
        db.transaction(tx => {
            tx.executeSql(
                "UPDATE contactwithrecords SET remoteid='"+remoteid+"' WHERE recordid="+recordid,
                [],
                (tx, results) => {
                    // console.log('setrecord : Results', results);
                }, (t, error) => {
                    // console.log('setrecord : error : ', error)
                }
            );
        });
    }

     setRemoteIdBooks(name, remoteid){
        db.transaction(tx => {
            tx.executeSql(
                "UPDATE books SET remoteid='"+remoteid+"' WHERE name='"+name+"'",
                [],
                (tx, results) => {
                    // console.log('setrecord : Results', results);
                }, (t, error) => {
                    // console.log('setrecord : error : ', error)
                }
            );
        });
    }


    setRemoteIdPersonals(remoteid){
        db.transaction(tx => {
            tx.executeSql(
                "UPDATE personals SET remoteid='"+remoteid+"' WHERE id=1",
                [],
                (tx, results) => {
                    // console.log('setrecord : Results', results);
                }, (t, error) => {
                    // console.log('setrecord : error : ', error)
                }
            );
        });
    }
    




    firstUseDone(){
        db.transaction(tx => {
            tx.executeSql(
                "UPDATE firstuse SET firstuse=0 WHERE firstuse=1",
                [],
                (tx, results) => {
                    console.log('setrecord : Results', results);
                }, (t, error) => {
                    console.log('setrecord : error : ', error)
                }
            );
        });
    }

    isFirstUse(){
        return new Promise((resolve, reject) =>{
            db.transaction(tx => {
                tx.executeSql(
                    "SELECT * FROM firstuse",
                    [],
                    (tx, results) => {
                        resolve(results)
                        // console.log('setrecord : Results', results);
                    }, (t, error) => {
                        reject(error)
                        // console.log('setrecord : error : ', error)
                    }
                );
            });
        })

    }

     setLoanGivenRecord(bookid, amountGiven, date, duedate, give, take, attachment, remarks, partner_contact,customerName, phoneid, typedb, mode, installment, totalMonths, interest, loanName, installmentAmount) {

         //recordid, txid, book_id, amount, date, duedate, give, take, attachment, remarks, partner_contact, uploaded, interest, type,installment , totalMonths , loanName , installmentAmount , remoteid


        const uploaded = 0;
        const lastUpdate = new Date();
      
        db.transaction(tx => {
            tx.executeSql(
                "INSERT INTO loanrecords ( bookid,isactive , amountGiven , date , duedate,lastupdated , give , take , attachment , remarks , contactno,customername , uploaded , interest , type , mode ,  installment , totalMonths, loanName, installmentAmount ) VALUES (" + bookid + "," +1+ "," + amountGiven + ",'" + date + "', '" + duedate + "', '" +lastUpdate+ "', "+ give + ", " + take + ", '" + attachment + "', '" + remarks + "', '" + partner_contact+ "', '" + customerName + "' ,0, '" + interest + "', '"+typedb+"','"+mode+"','"+installment+"',"+totalMonths+",'"+loanName+"', "+installmentAmount+")",
                [],
                (tx, results) => {

                    console.log('setrecord : Results', results);
                }, (t, error) => {
                    console.log('setrecord : error : ', error)
                }
            );
        });

    }



    setLoanTakenRecord(bookid, amountTaken, date, duedate, give, take, attachment, remarks, partner_contact,customerName, phoneid, typedb, mode, installment, totalMonths, interest, loanName, installmentAmount) {

        //recordid, txid, book_id, amount, date, duedate, give, take, attachment, remarks, partner_contact, uploaded, interest, type,installment , totalMonths , loanName , installmentAmount , remoteid


       const uploaded = 0;
       const lastUpdate = new Date();
      
       db.transaction(tx => {
           tx.executeSql(
               "INSERT INTO loanrecords ( bookid , amountTaken , date , duedate ,lastupdated ,give , take , attachment , remarks , contactno,customername  , uploaded , interest , type , mode ,  installment , totalMonths, loanName, installmentAmount ) VALUES (" + bookid + "," + amountTaken + ",'" + date + "', '" + duedate +"', '" + lastUpdate + "', " + give + ", " + take + ", '" + attachment + "', '" + remarks + "', '" + partner_contact  + "', '" +customerName+ "' ,0, '" + interest + "', '"+typedb+"','"+mode+"','"+installment+"',"+totalMonths+",'"+loanName+"', "+installmentAmount+")",
               [],
               (tx, results) => {

                   console.log('setrecord : Results', results);
               }, (t, error) => {
                   console.log('setrecord : error : ', error)
               }
           );
       });

   }





    deleteContactFromBook(phone, bookId, loanYes){
        db.transaction(tx => {
                tx.executeSql(
                    "DELETE FROM language WHERE contact='"+phone +"' AND bookid='" + bookid + "' AND loanYes="+loanYes,
                    [],
                    (tx, results) => {
                        // console.log('Languages Texts : ', results['rows']['_array']);
                        // resolve(results['rows']['_array'])
                    }, (t, error) => {
                        // console.log('Error')
                        // reject(error)
                    })
            })

    }

    insertGaveGotYes(phone, bookId, loanYes){
        return new Promise((resolve, reject) => {
                    db.transaction(tx => {
                        tx.executeSql(
                            "UPDATE contactwithrecords SET hasGaveGot=1 WHERE contact='"+ phone + "' AND bookid='" + bookId + "' AND loanYes="+loanYes,
                            [],
                            (tx, results) => {
                                resolve(results)
                            }, (t, error) => {
                                console.log('Constructor error : ', error)
                                reject(error)
                            }
                        );
                    });
                })
    }


    insertPayableDueYes(phone, bookId, loanYes){
        return new Promise((resolve, reject) => {
                    db.transaction(tx => {
                        tx.executeSql(
                            "UPDATE contactwithrecords SET hasRecievableDue=1 WHERE contact='"+ phone + "' AND bookid='" + bookId + "' AND loanYes="+loanYes,
                            [],
                            (tx, results) => {
                                resolve(results)
                            }, (t, error) => {
                                console.log('Constructor error : ', error)
                                reject(error)
                            }
                        );
                    });
                })
    }

getRecordId(phone,bookId){
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                "SELECT recordid FROM contactwithrecords WHERE contact='" + phone + "' AND bookid='" + bookId+ "' ",
                [],
                (tx, results) => {
                    console.log('recordid',results.rows['_array'][0]['recordid'])
                    resolve(results.rows['_array'][0]['recordid'])
                }, (t, error) => {
                    console.log('Constructor error : ', error)
                    reject(error)
                }
            );
        });
    })

}



    checkAndInsertContact(phone, bookId, name,loanYes, Gg=0, Rd=0) {

        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    "SELECT * FROM contactwithrecords WHERE contact='" + phone + "' AND bookid='" + bookId +" AND isDeleted=0 "+ "' AND loanYes="+loanYes+" AND hasGaveGot="+Gg+" AND hasRecievableDue="+Rd,
                    [],
                    (tx, results) => {
                        console.log('setrecord : Results', results);
                        const date = new Date();
                        results.rows.length === 0 ?
                            db.transaction(tx => {
                                tx.executeSql(
                                    "INSERT INTO contactwithrecords (contact, bookid, name, lastupdated, loanYes, netAmount, pAmount, rAmount, hasGaveGot, hasRecievableDue) VALUES ('" + phone + "'," + bookId + ",'" + name + "', '" + date + "',"+loanYes+",0,0,0,"+Gg+","+Rd+")",
                                    [],
                                    (tx, results) => {
                                        resolve(1)
                                        console.log('setrecord : Results', results);
                                    }, (t, error) => {
                                        console.log('setrecord : error : ', error)
                                    }
                                );
                            }) : resolve(results);
                        console.log('Already exists');

                    }, (t, error) => {
                        console.log('setrecord : error : ', error)
                        reject(error)
                    }
                );
            });
        })


    }

    updateBookName(bookid, name){
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    "UPDATE books SET name='"+name+"' WHERE id="+bookid,
                    [],
                    (tx, results) => {
                        resolve(results)
                    }, (t, error) => {
                        console.log('Constructor error : ', error)
                        reject(error)
                    }
                );
            });
        })

    }

    updateLastUpdated(phone, bookId) {
        const date = new Date();
        db.transaction(tx => {
            tx.executeSql(
                "UPDATE contactwithrecords SET lastupdated='" + date + "' WHERE contact='" + phone + "' AND bookid='" + bookId + "'",
                [],
                (tx, results) => {
                    console.log('setrecord : Results', results);
                }, (t, error) => {
                    console.log('setrecord : error : ', error)
                }
            );
        });
    }


    getExistingContacts(bookId) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    "SELECT *, sum(amount) as amount FROM contactwithrecords rc,records r WHERE rc.recordid=r.recordid AND rc.bookid = r.book_id AND r.book_id=" + bookId + " AND isDeleted=0 GROUP BY contact ORDER BY lastupdated DESC",
                    // "SELECT * FROM contactwithrecords WHERE bookid=" + bookId + " AND isDeleted=0 ORDER BY lastupdated DESC",
                    [],
                    (tx, results) => {
                        console.log('obj',results)
                        resolve(results.rows['_array'])
                    },
                    (t, error) => {
                        console.log('err',error)
                        reject(error)
                    })
            })
        })

    }

    getExistingContactsWithDue(bookId) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    "SELECT * FROM contactwithrecords WHERE bookid=" + bookId + " AND isDeleted=0 AND hasRecievableDue=1 ORDER BY lastupdated DESC",
                    [],
                    (tx, results) => {
                        resolve(results.rows['_array'])
                    },
                    (t, error) => {
                        reject(error)
                    })
            })
        })

        // Screen 3 name not coming 

    }
    // query change required join record and contactwithrecords
    getExistingContactsWithGave(bookId) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    "SELECT *, sum(amount) as amount FROM contactwithrecords rc,records r WHERE rc.recordid=r.recordid AND rc.bookid = r.book_id AND r.book_id=" + bookId + " AND isDeleted=0 AND ((give = 0 AND take = 1) OR (give = 1 AND take = 0)) GROUP BY contact,give ORDER BY lastupdated DESC",
                    [],
                    (tx, results) => {
                        resolve(results.rows['_array'])
                    },
                    (t, error) => {
                        reject(error)
                    })
            })
        })

    }

    getCashOutTransactions(bookId) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    "SELECT * FROM contactwithrecords rc,records r WHERE rc.recordid=r.recordid AND rc.bookid = r.book_id AND r.book_id=" + bookId + " AND type='Cash' AND isDeleted=0 AND ((give = 0 AND take = 1) OR (give = 0 AND take = 2)) ORDER BY lastupdated DESC",
                    [],
                    (tx, results) => {
                        resolve(results.rows['_array'])
                    },
                    (t, error) => {
                        reject(error)
                    })
            })
        })

    }
    
    

       // query change required join record and contactwithrecords
       getExistingContactsWithRecble(bookId) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    "SELECT *, sum(amount) as amount FROM contactwithrecords rc,records r WHERE rc.recordid=r.recordid AND rc.bookid = r.book_id AND r.book_id=" + bookId + " AND isDeleted=0 AND ((give = 0 AND take = 2) OR (give = 2 AND take = 0)) GROUP BY contact,give ORDER BY lastupdated DESC",
                    [],
                    (tx, results) => {
                        console.log('rcvble',results.rows['_array'])
                        resolve(results.rows['_array'])
                    },
                    (t, error) => {
                        reject(error)
                    })
            })
        })

    }









    setrecord(recordid,bookid, amount, duedate, give, take, attachment, remarks, partner_contact, phoneid, type) {
        const date = new Date();
        const uploaded = 0;
        console.log()
        db.transaction(tx => {
            tx.executeSql(
                "INSERT INTO records (recordid,book_id, amount, date, duedate, give, take, attachment, remarks, partner_contact, uploaded, phoneid, type) VALUES ("+recordid+","+ bookid + "," + amount + ",'" + date + "', '" + duedate + "', " + give + ", " + take + ", '" + attachment + "', '" + remarks + "', '" + partner_contact + "' ,0,"+phoneid+",'"+type+"')",
                [],
                (tx, results) => {
                    this.updateLastUpdated(partner_contact, bookid);
                    console.log('setrecord : Results', results);
                }, (t, error) => {
                    console.log('setrecord : error : ', error)
                }
            );
        });
    }

    getUnuploadedData(){
        return new Promise((resolve, reject) => {

            db.transaction(tx => {
                tx.executeSql(
                    "SELECT * FROM records WHERE uploaded=0",
                    [],
                    (tx, results) => {
                        console.log('get Record Results new ', results.rows['_array']);
                        resolve(results.rows['_array'])
                    }, (t, error) => {
                        console.log('Constructor error : ', error)
                        reject(error)
                    }
                );
            });
        })
    }

    checkLoanName(name,bookid){
        return new Promise((resolve, reject) => {

            db.transaction(tx => {
                tx.executeSql(
                    "SELECT * FROM loanname WHERE bookid = "+bookid+" AND name='"+name+"' ORDER BY lastupdated DESC",
                    [],
                    (tx, results) => {
                        //console.log('get Record Results new ', results.rows['_array']);
                        resolve(results.rows['_array'])
                    }, (t, error) => {
                        console.log('Constructor error : ', error)
                        reject(error)
                    }
                );
            });
        })
    }

    addLoanName(name, contactname, contactno,bookid){

        return new Promise((resolve, reject)=>{
            console.log('phno',contactno)
            db.transaction(tx => {
                const date = new Date();
                tx.executeSql(
                    "INSERT INTO loanname (name, isactive, lastupdated, contactname, contactno, bookid) VALUES ('" + name + "', 1, '" + date + "', '"+contactname+"', '"+contactno+"', "+bookid+")",
                    [],
                    (tx, results) => {
                        resolve(1)

                        console.log('setrecord : Results', results);
                    }, (t, error) => {

                        console.log('setrecord : error : ', error)
                        reject(0)
                    }
                );
            });
        })
    }

    getLoanNames(bookid){
        return new Promise((resolve, reject) => {

            db.transaction(tx => {
                tx.executeSql(
                    "SELECT *,customername as contactname,loanName as name,contactno as contactno,sum(amountGiven) as totalGiven,sum(amountTaken) as totalTaken FROM loanrecords WHERE bookid = "+bookid+" GROUP BY contactno ORDER BY lastupdated DESC",
                    // ln,loanrecords lr WHERE ln.contactno = lr.partner_contact AND ln.bookid=lr.book_id AND bookid = "+bookid+" ORDER BY lastupdated DESC",
                    [],
                    (tx, results) => {
                        //console.log('get Record Results new ', results.rows['_array']);
                        resolve(results.rows['_array'])
                    }, (t, error) => {
                        console.log('Constructor error : ', error)
                        reject(error)
                    }
                );
            });
        })
    }



    setIsUploadedData(recordid){
        return new Promise((resolve, reject) => {

            db.transaction(tx => {
                tx.executeSql(
                    "UPDATE records SET uploaded=1 WHERE recordid="+recordid,
                    [],
                    (tx, results) => {
                        resolve(results)
                    }, (t, error) => {
                        console.log('Constructor error : ', error)
                        reject(error)
                    }
                );
            });
        })

    }


    setUserData(recordid,bookId,phone,key,value){
        return new Promise((resolve, reject) => {


            db.transaction(tx => {
                tx.executeSql(
                    "SELECT * FROM contactwithrecords WHERE contact='" + phone + "' AND bookid=" + bookId +" AND isDeleted=0 ",
                    [],
                    (tx, results) => {
                       
                        results.rows.length !== 0 ?
                            db.transaction(tx => {
                                tx.executeSql(
                                    "UPDATE contactwithrecords SET "+key+" = '"+value+"' WHERE recordid="+recordid +" AND bookid=" +bookId + " AND contact ="+phone ,
                                    [],
                                    (tx, results) => {


                                        db.transaction(tx => {
                                            tx.executeSql(
                                                "SELECT * FROM contactwithrecords WHERE contact='" + phone + "' AND bookid=" + bookId +" AND isDeleted=0 ",
                                                [],
                                                (tx, results) => {
                                                    console.log('get updated Results new ', results.rows['_array']);
                                                    resolve(results.rows)
                                                }, (t, error) => {
                                                    console.log('Constructor error : ', error)
                                                    reject(error)
                                                }
                                            );
                                        });

                                     
                                   
                                    }, (t, error) => {
                                        console.log('setrecord : error : ', error)
                                    }
                                );
                            }) : resolve(results);
                        console.log('exists');

                    }, (t, error) => {
                        console.log('No customer exist ', error)
                        reject(error)
                    }
                );
            });
        })






            // db.transaction(tx => {
            //     tx.executeSql(
                  
            //         [],
            //         (tx, results) => {
            //             resolve(results)
            //         }, (t, error) => {
            //             console.log('Constructor error : ', error)
            //             reject(error)
            //         }
            //     );
            // });
        // })

    }
    setIsUploadedDataLoan(recordid){
        return new Promise((resolve, reject) => {

            db.transaction(tx => {
                tx.executeSql(
                    "UPDATE loanrecords SET uploaded=1 WHERE recordid="+recordid,
                    [],
                    (tx, results) => {
                        resolve(results)
                    }, (t, error) => {
                        console.log('Constructor error : ', error)
                        reject(error)
                    }
                );
            });
        })

    }

    getUnuploadedLoanData(){
        return new Promise((resolve, reject) => {

            db.transaction(tx => {
                tx.executeSql(
                    "SELECT * FROM loanrecords WHERE uploaded=0",
                    [],
                    (tx, results) => {
                        console.log('get Record Results new ', results.rows['_array']);
                        resolve(results.rows['_array'])
                    }, (t, error) => {
                        console.log('Constructor error : ', error)
                        reject(error)
                    }
                );
            });
        })
    }



    getLoanRecordById(id){
        return new Promise((resolve, reject) => {

            db.transaction(tx => {
                tx.executeSql(
                    "SELECT *,contactno as partner_contact,lastupdated as date ,customername as contactname,loanName as name FROM loanrecords WHERE recordid=" + id,
                    [],
                    (tx, results) => {
                        console.log('get Record Results new ', results.rows['_array']);
                        resolve(results.rows['_array'])
                    }, (t, error) => {
                        console.log('Constructor error : ', error)
                        reject(error)
                    }
                );
            });
        })
    }

    getLoanRecord(bookid) {
        return new Promise((resolve, reject) => {

            db.transaction(tx => {
                tx.executeSql(
                    "SELECT * FROM loanrecords WHERE bookid=" + bookid,
                    [],
                    (tx, results) => {
                        console.log('get Record Results new ', results.rows['_array']);
                        resolve(results.rows['_array'])
                    }, (t, error) => {
                        console.log('Constructor error : ', error)
                        reject(error)
                    }
                );
            });
        })

    }

    getRecordById(id){
        return new Promise((resolve, reject) => {

            db.transaction(tx => {
                tx.executeSql(
                    "SELECT * FROM records WHERE recordid=" + id,
                    [],
                    (tx, results) => {
                        console.log('get Record Results new ', results.rows['_array']);
                        resolve(results.rows['_array'])
                    }, (t, error) => {
                        console.log('Constructor error : ', error)
                        reject(error)
                    }
                );
            });
        })
    }
    getAllRecord() {
        return new Promise((resolve, reject) => {

            db.transaction(tx => {
                tx.executeSql(
                    "SELECT * FROM records",
                    [],
                    (tx, results) => {
                        console.log('get Record Results new ', results.rows['_array']);
                        resolve(results.rows['_array'])
                    }, (t, error) => {
                        console.log('Constructor error : ', error)
                        reject(error)
                    }
                );
            });
        })

    }
    getRecordByQueryString(bookid,queryString){
        return new Promise((resolve, reject) => {

            db.transaction(tx => {
                tx.executeSql(
                    "SELECT * FROM records r,contactwithrecords cws WHERE r.book_id=cws.bookid AND r.partner_contact=cws.contact AND book_id=" +bookid+" and " +queryString,
                    [],
                    (tx, results) => {
                        console.log('get Record Results new ', results.rows['_array']);
                        resolve(results.rows['_array'])
                    }, (t, error) => {
                        console.log('Constructor error : ', error)
                        reject(error)
                    }
                );
            });
        })
    }

    

    getRecord(bookid) {
        return new Promise((resolve, reject) => {

            db.transaction(tx => {
                tx.executeSql(
                    "SELECT * FROM contactwithrecords cws,records r WHERE  r.partner_contact=cws.contact AND r.book_id=cws.bookid AND book_id=" + bookid,
                    [],
                    (tx, results) => {
                        console.log('get Record Results new ', results.rows['_array']);
                        resolve(results.rows['_array'])
                    }, (t, error) => {
                        console.log('Constructor error : ', error)
                        reject(error)
                    }
                );
            });
        })

    }


    getLoanRecord(bookid) {
        return new Promise((resolve, reject) => {

            db.transaction(tx => {
                tx.executeSql(
                    "SELECT *,contactno as partner_contact,lastupdated as date ,customername as contactname,loanName as name FROM loanrecords WHERE bookid=" + bookid,
                    [],
                    (tx, results) => {
                        console.log('get Record Results new ', results.rows['_array']);
                        resolve(results.rows['_array'])
                    }, (t, error) => {
                        console.log('Constructor error : ', error)
                        reject(error)
                    }
                );
            });
        })

    }

    getCustomerCount(bookid) {
        return new Promise((resolve, reject) => {

            db.transaction(tx => {
                tx.executeSql(
                    "SELECT COUNT(*) FROM contactwithrecords WHERE bookid=" + bookid +" AND isDeleted=0 ",
                    [],
                    (tx, results) => {
                        console.log('get Record Results new ', results.rows['_array']);
                        resolve(results.rows['_array'])
                    }, (t, error) => {
                        console.log('Constructor error : ', error)
                        reject(error)
                    }
                );
            });
        })

    }
    

    getDetailsOfUser(phone, bookid) {
        return new Promise((resolve, reject) => {
            const date = new Date();
            db.transaction(tx => {
                tx.executeSql(
                    "SELECT * FROM contactwithrecords WHERE bookid=" + bookid + " AND contact='" + phone+"'"+" AND isDeleted=0",
                    [],
                    (tx, results) => {
                        console.log('get Record Results', results.rows);
                        resolve(results.rows)
                    }, (t, error) => {
                        console.log('Constructor error : ', error)
                        reject(error)
                    }
                );
            });
        })
    }

 


    getRecordsOfUser(phone, bookid) {
        return new Promise((resolve, reject) => {
            const date = new Date();
            db.transaction(tx => {
                tx.executeSql(
                    "SELECT * FROM records WHERE book_id=" + bookid + " AND partner_contact='" + phone+"'",
                    [],
                    (tx, results) => {
                        console.log('get Record Results', results.rows);
                        resolve(results.rows)
                    }, (t, error) => {
                        console.log('Constructor error : ', error)
                        reject(error)
                    }
                );
            });
        })
    }

   


    getDuePayableRecord(bookid){
        return new Promise((resolve, reject) => {
            const date = new Date();
            db.transaction(tx => {
                tx.executeSql(
                    "SELECT * FROM contactwithrecords cws,records r WHERE  r.contact=cws.partner_contact AND r.book_id=cws.bookid AND r.book_id=" + bookid + " AND cws.isDeleted=0 and r.book_id=cws.bookid and r.take=2 OR r.give=2",
                    [],
                    (tx, results) => {
                        console.log('get Record Results', results.rows['_array']);
                        resolve(results.rows)
                    }, (t, error) => {
                        console.log('Constructor error : ', error)
                        reject(error)
                    }
                );
            });
        })
    }


    getLoanRecordsOfUser(phone, bookid) {
        return new Promise((resolve, reject) => {
            const date = new Date();
            db.transaction(tx => {
                tx.executeSql(
                    "SELECT *,customername as contactname,loanName as name FROM loanrecords WHERE bookid=" + bookid + " AND contactno='" + phone+"'",
                    [],
                    (tx, results) => {
                        console.log('get Record Results', results.rows);
                        resolve(results.rows)
                    }, (t, error) => {
                        console.log('Constructor error : ', error)
                        reject(error)
                    }
                );
            });
        })
    }

    setFullName(name) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    "UPDATE personals SET fullname = ? WHERE ID=1", [name],
                    (tx, results) => {
                        console.log('Results', results.rowsAffected);
                        resolve(results)
                    },
                    (t, err) => {
                        reject(err)
                    }
                );
            });
        })

    }

    setCurrentBook(bookid) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    "UPDATE personals SET currentbook = ? WHERE ID=1", [bookid],
                    (tx, results) => {
                        console.log('Set Current book', results.rowsAffected);
                        resolve(results)
                    },
                    (t, err) => {
                        reject(err)
                    }
                );
            });
        })

    }

    getUserData() {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    "SELECT * FROM personals WHERE id=1", [],
                    (tx, results) => {
                        console.log('UID getter Results', results.rows.item(0));
                        resolve(results.rows.item(0))
                    }, (t, error) => {
                        console.log('Constructor error : ', error)
                        reject(error)
                    }
                );
            });
        })
    }

    getCurrentBook() {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    "SELECT currentbook FROM personals WHERE id=1", [],
                    (tx, results) => {

                        resolve(results.rows.item(0).currentbook)
                    }, (t, error) => {
                        console.log('Constructor error : ', error)
                        reject(error)
                    }
                );
            });
        })
    }

    setUid(uid) {
        db.transaction(tx => {
            tx.executeSql(
                "UPDATE personals SET uid = ? WHERE ID=1", [uid],
                (tx, results) => {
                    console.log('Results', results.rowsAffected);
                }, (t, error) => {
                    console.log(dbObject.getUid())
                }
            );
        });
    }


    setIsEmailVerified(isemailverified) {
        db.transaction(tx => {
            tx.executeSql(
                "UPDATE personals SET isemailverified = ? WHERE id=1", [isemailverified],
                (tx, results) => {
                    console.log('Results', results.rowsAffected);
                }
            );
        });
    }


    setPhotoUrl(photourl) {
        db.transaction(tx => {
            tx.executeSql(
                "UPDATE personals SET photourl = ? WHERE id=1", [photourl],
                (tx, results) => {
                    console.log('Results', results.rowsAffected);
                }
            );
        });
    }


    setLastSignIn(last_sign_in) {
        db.transaction(tx => {
            tx.executeSql(
                "UPDATE personals SET last_sign_in = ? WHERE id=1", [last_sign_in],
                (tx, results) => {
                    console.log('Results', results.rowsAffected);
                }
            );
        });
    }


    setFirstSignIn(first_sign_in) {
        db.transaction(tx => {
            tx.executeSql(
                "UPDATE personals SET first_sign_in = ? WHERE id=1", [first_sign_in],
                (tx, results) => {
                    console.log('Results', results.rowsAffected);
                }
            );
        });
    }


    setEmail(email) {
        db.transaction(tx => {
            tx.executeSql(
                "UPDATE personals SET email = ? WHERE id=1", [email],
                (tx, results) => {
                    console.log('Results', results.rowsAffected);
                }
            );
        });
    }


    setShopAddress(shopaddress) {
        db.transaction(tx => {
            tx.executeSql(
                "UPDATE personals SET shopaddress = ? WHERE id=1", [shopaddress],
                (tx, results) => {
                    console.log('Results', results.rowsAffected);
                }
            );
        });
    }


    setTagline(tagline) {
        db.transaction(tx => {
            tx.executeSql(
                "UPDATE personals SET tagline = ? WHERE id=1", [tagline],
                (tx, results) => {
                    console.log('Results', results.rowsAffected);
                }
            );
        });
    }


    setCurrency(currency) {
        db.transaction(tx => {
            tx.executeSql(
                "UPDATE personals SET currency = '"+currency+"' WHERE id=1", [],
                (tx, results) => {
                    console.log('Results', results.rowsAffected);
                }
            );
        });
    }

    setLanguage(language) {
        db.transaction(tx => {
            tx.executeSql(
                "UPDATE personals SET language = '"+language+"' WHERE id=1", [],
                (tx, results) => {
                    console.log('Results', results.rowsAffected);
                    this.getUserData()
                },
                    (t, err) => {
                        console.log(err)
                    }
            );
        });
    }


    setIsActive(active) {
        db.transaction(tx => {
            tx.executeSql(
                "UPDATE personals SET active = ? WHERE id=1", [active],
                (tx, results) => {
                    console.log('Results', results.rowsAffected);
                }
            );
        });
    }


    setPhoneNo(phone) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    "UPDATE personals SET phone_no = ? WHERE id=1", [phone],
                    (tx, results) => {
                        console.log('Results', results.rowsAffected);
                        resolve(results)
                    },
                    (t, err) => {
                        reject(err)
                    }
                );
            });
        })
    }

    setUPI(UPIID) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    "UPDATE personals SET UPIID = ? WHERE id=1", [UPIID],
                    (tx, results) => {
                        console.log('Results', results.rowsAffected);
                        resolve(results)
                    },
                    (t, err) => {
                        reject(err)
                    }
                );
            });
        })
    }

    setAuthToken(authtoken) {
        db.transaction(tx => {
            tx.executeSql(
                "UPDATE personals auth_token = ? WHERE id=1", [authtoken],
                (tx, results) => {
                    console.log('Results', results.rowsAffected);
                }
            );
        });
    }

    addBook(bookname, password) {
        return new Promise((resolve, reject)=>{
            db.transaction(tx => {
                tx.executeSql(
                    "INSERT INTO books (name,trashed,password) VALUES ('" + bookname + "', 0, '" + password + "')",
                    [],
                    (tx, results) => {
                        resolve(1)

                        console.log('setrecord : Results', results);
                    }, (t, error) => {

                        console.log('setrecord : error : ', error)
                        reject(0)
                    }
                );
            });
        })
    }

    addBooktoTrash(id) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    "UPDATE books SET trashed = 1 WHERE id="+id, [],
                    (tx, results) => {
                        console.log('Results', results.rowsAffected);
                        resolve(results.rows)
                    }, (t, error) => {
                        console.log('Constructor error : ', error)
                        reject(error)
                    }
                );
            });
        })
    }
    removeBookFromTrash(id) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    "UPDATE books SET trashed = 0 WHERE id="+id, [],
                    (tx, results) => {
                        console.log('Results', results.rowsAffected);
                        resolve(results.rows)
                    }, (t, error) => {
                        console.log('Constructor error : ', error)
                        reject(error)
                    }
                );
            });
        })
    }
    checkBookPassword(id,password){
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    "SELECT * FROM books WHERE id=" + id + "", [],
                    (tx, results) => {

                        if(results.rows.item(0).password===password){
                            resolve(1)
                        }else{
                            resolve(0)
                        }


                    }, (t, error) => {
                        console.log('Constructor error : ', error)
                        reject(error)
                    }
                );
            });
        })
    }
    deleteBookFromTrash(id) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    "UPDATE books SET trashed = 2 WHERE id="+id, [],
                    (tx, results) => {
                        console.log('Results', results.rowsAffected);
                        resolve(results.rows)
                    }, (t, error) => {
                        console.log('Constructor error : ', error)
                        reject(error)
                    }
                );
            });
        })
    }

    getBook(id) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    "SELECT * FROM books WHERE id=" + id + " AND trashed=0", [],
                    (tx, results) => {

                        resolve(results.rows.item(0))
                    }, (t, error) => {
                        console.log('Constructor error : ', error)
                        reject(error)
                    }
                );
            });
        })
    }

    getAllActiveBooks() {
        return new Promise((resolve, reject) => {
            storeObject.setBookUpdated(true)
            db.transaction(tx => {
                tx.executeSql(
                    "SELECT * FROM books WHERE trashed=0", [],
                    (tx, results) => {
                        // console.log("Record All Books", results.rows)
                        resolve(results.rows)
                    }, (t, error) => {
                        console.log('Constructor error : ', error)
                        reject(error)
                    }
                );
            });
        })
    }

    getAllTrashedBooks() {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    "SELECT * FROM books WHERE trashed=1", [],
                    (tx, results) => {

                        resolve(results.rows['_array'])
                    }, (t, error) => {
                        console.log('Constructor error : ', error)
                        reject(error)
                    }
                );
            });
        })
    }

    getSumOfDue(bookid) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    "SELECT amount FROM records WHERE book_id=" + bookid+" AND take=2 AND give=0", [],
                    (tx, results) => {
                        const arr = results.rows['_array']
                        const map = arr.map(a => a.amount)
                        const sum = map.reduce((a, b) => a + b, 0)
                        resolve(sum)
                    }, (t, error) => {
                        reject(error)
                    }
                )
            })
        });
    }

   

    getSumOfPay(bookid) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    "SELECT amount FROM records WHERE book_id=" + bookid+" AND give=2 AND take=0", [],
                    (tx, results) => {
                        const arr = results.rows['_array']
                        const map = arr.map(a => a.amount)
                        const sum = map.reduce((a, b) => a + b, 0)
                        resolve(sum)
                    }, (t, error) => {
                        reject(error)
                    }
                )
            })
        });
    }

    getSumOfTakes(bookid) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    "SELECT amount FROM records WHERE book_id=" + bookid+" AND take=1 AND give=0", [],
                    (tx, results) => {
                        const arr = results.rows['_array']
                        const map = arr.map(a => a.amount)
                        const sum = map.reduce((a, b) => a + b, 0)
                        resolve(sum)
                    }, (t, error) => {
                        reject(error)
                    }
                )
            })
        });
    }
    getSumOfGaves(bookid) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    "SELECT amount FROM records WHERE book_id=" + bookid+" AND take=0 AND give=1", [],
                    (tx, results) => {
                        const arr = results.rows['_array']
                        const map = arr.map(a => a.amount)
                        const sum = map.reduce((a, b) => a + b, 0)
                        resolve(sum)
                    }, (t, error) => {
                        reject(error)
                    }
                )
            })
        });
    }

    getSumOfAllRed(bookid) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    "SELECT amount FROM records WHERE book_id=" + bookid+" AND (take=1 OR take=2) AND give=0", [],
                    (tx, results) => {
                        const arr = results.rows['_array']
                        const map = arr.map(a => a.amount)
                        const sum = map.reduce((a, b) => a + b, 0)
                        resolve(sum)
                    }, (t, error) => {
                        reject(error)
                    }
                )
            })
        });
    }
    getSumOfAllGreen(bookid) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    "SELECT amount FROM records WHERE book_id=" + bookid+" AND take=0 AND (give=1 OR give=2)", [],
                    (tx, results) => {
                        const arr = results.rows['_array']
                        const map = arr.map(a => a.amount)
                        const sum = map.reduce((a, b) => a + b, 0)
                        resolve(sum)
                    }, (t, error) => {
                        reject(error)
                    }
                )
            })
        });
    }

    getSumOfTakesContact(bookid,c) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    "SELECT amount FROM records WHERE book_id=" + bookid+" AND (take=1 OR take=2) AND partner_contact='"+c+"'", [],
                    (tx, results) => {
                        const arr = results.rows['_array']
                        console.log('ckecking arr')
                        console.log(arr)
                        const map = arr.map(a => a.amount)
                        const sum = map.reduce((a, b) => a + b, 0)
                        resolve(sum)
                    }, (t, error) => {
                        reject(error)
                    }
                )
            })
        });
    }
    getSumOfGavesContact(bookid,c) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    "SELECT amount FROM records WHERE book_id=" + bookid+" AND (give=1 OR give=2) AND partner_contact='"+c+"'", [],
                    (tx, results) => {
                        const arr = results.rows['_array']
                        const map = arr.map(a => a.amount)
                        const sum = map.reduce((a, b) => a + b, 0)
                        resolve(sum)
                    }, (t, error) => {
                        reject(error)
                    }
                )
            })
        });
    }

    // AND r.contact=cws.partner_contact
    getCashInTransactions(bookId) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    "SELECT * FROM contactwithrecords rc,records r WHERE rc.recordid=r.recordid AND rc.bookid = r.book_id AND r.book_id=" + bookId + " AND type='Cash' AND isDeleted=0 AND ((give = 1 AND take = 0) OR (give = 2 AND take = 0)) ORDER BY lastupdated DESC",
                    // "SELECT * FROM records r,contactwithrecords cws WHERE book_id=" + bookid+" AND type='Cash' OR type='cash'", [],
                    [],
                    (tx, results) => {
                        console.log('Cash in',results.rows)
                        resolve(results.rows['_array'])

                    }, (t, error) => {
                        console.log('Cash in error',JSON.stringify(error))
                        reject(error)
                    }
                )
            })
        });
    }

    

    getSumOfTakesLoan(bookid) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    "SELECT * FROM loanrecords WHERE book_id=" + bookid+" AND take=1", [],
                    (tx, results) => {
                        const arr = results.rows['_array']
                        const map = arr.map(a => this.getTotalAmount(a.amount, a.interest, a.installment, a.totalMonths))
                        const sum = map.reduce((a, b) => a + b, 0)
                        resolve(sum)
                    }, (t, error) => {
                        reject(error)
                    }
                )
            })
        });
    }
    getSumOfGavesLoan(bookid) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    "SELECT * FROM loanrecords WHERE book_id=" + bookid+" AND take=0", [],
                    (tx, results) => {
                        const arr = results.rows['_array']
                        const map = arr.map(a => this.getTotalAmount(a.amount, a.interest, a.installment, a.totalMonths))
                        const sum = map.reduce((a, b) => a + b, 0)
                        resolve(sum)
                    }, (t, error) => {
                        reject(error)
                    }
                )
            })
        });
    }
    // amount loanrecords

    getTakesLoanContact(bookid) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    "SELECT *,amountTaken as amount,contactno as partner_contact,loanName as name,customername as contactname,lastupdated as date FROM loanrecords WHERE  bookid=" + bookid + " AND take=1", [],
                    (tx, results) => {
                       
                     
                        resolve(results.rows)
                    }, (t, error) => {
                        reject(error)
                    }
                )
            })
        });
    }
    getGavesLoanContact(bookid) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    "SELECT *,amountGiven as amount,contactno as partner_contact,loanName as name,customername as contactname,lastupdated as date FROM loanrecords WHERE  bookid=" + bookid + " AND give=1", [],
                    (tx, results) => {
                        
                       console.log('loan records',results.rows)
                        
                        resolve(results.rows)
                    }, (t, error) => {
                        reject(error)
                    }
                )
            })
        });
    }



    getSumOfTakesLoanContact(bookid) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    "SELECT sum(amountTaken) as totalTaken FROM loanrecords WHERE bookid=" + bookid, [],
                    (tx, results) => {
                       
                        // const arr = results.rows['_array']
                        // const map = arr.map(a => a.amount)
                        // const sum = map.reduce((a, b) => a + b, 0)
                     
                        resolve(results.rows['_array'][0]['totalTaken'])
                    }, (t, error) => {
                        reject(error)
                    }
                )
            })
        });
    }
    getSumOfGavesLoanContact(bookid) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    "SELECT sum(amountGiven) as totalGiven FROM loanrecords WHERE bookid=" + bookid, [],
                    (tx, results) => {
                        
                        // const arr = results.rows['_array']
                        // const map = arr.map(a => a.amount)
                        // const sum = map.reduce((a, b) => a + b, 0)
                        
                        resolve(results.rows['_array'][0]['totalGiven'])
                    }, (t, error) => {
                        reject(error)
                    }
                )
            })
        });
    }

    getTotalSumOfRecords(phone, bookid) {
        let take = 0;
        let give = 0;
        let sum = 0;
        this.getRecordsOfUser(phone, bookid).then(function (data) {
                data.map(d => {
                    if (d.take == 1) {
                        take = take + d.amount
                    } else {
                        give = give + d.amount
                    }
                })
                sum = take + give;
                if (sum < 0) {
                    console.log("Take")
                } else {
                    console.log("Give")
                }
            }
        )
    }


    getTotalAmount(amount, interest, installment, numberOfMonths) {

        switch (installment) {
            case "Monthly":
                return Math.round((amount * interest * numberOfMonths / 100) * 100) / 100;

            case "Quarterly":
                return Math.round((amount * interest * (numberOfMonths / 3) / 100) * 100) / 100;

            case "Half Yearly":
                return Math.round((amount * interest * (numberOfMonths / 6) / 100) * 100) / 100;

            case "Annually":
                return Math.round((amount * interest * (numberOfMonths / 12) / 100) * 100) / 100;

        }
    }







}

const dbObject = new database()

export default dbObject
