/**
 * Created by akutty on 25/08/16.
 */

    window.onload = function () {
        console.log('here');
        var player = function(name, sign){
            this.name = name;
            this.sign = sign;
            this.score = 0;

            this.updateScore = function(newScore){
                this.score =newScore;
            }
        }
        var players = [];
        var virtualBoard = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        var wins = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ];
        players[0] = new player("Arun", "X");
        players[1] = new player("Neil", "O");
        var turn = 0;
        var virtualBoardPosition = 0
        var board = function(row, col) {
            this.row = row;
            this.col = col;

            this.drawBoard = function(){
                var boardDiv = document.createElement('div');
                boardDiv.className = 'board';
                boardDiv.setAttribute('id', 'board');
                var rowDiv = [];
                var colDiv = [];
                for (var i = 0; i < 3; i++) {
                    rowDiv[i] = document.createElement('div');
                    rowDiv[i].className = 'row';
                    for (var j = 0; j < 3; j++) {
                        colDiv[j] = document.createElement('div');
                        colDiv[j].className = 'col';
                        rowDiv[i].appendChild(colDiv[j]);
                        colDiv[j].setAttribute("id", "s"+i+""+j) ;
                        colDiv[j].setAttribute("position",""+virtualBoardPosition);

                        virtualBoardPosition++;
                        colDiv[j].addEventListener('click', function(event) {
                            if(!this.getAttribute("sign")){
                                this.innerHTML = players[turn].sign;
                                virtualBoard[this.getAttribute("position")] = players[turn].sign;
                                console.log(this.getAttribute("position"));
                                console.log(virtualBoard);
                                turn = 1- turn;
                                if(isWinner(virtualBoard)){
                                    document.getElementById("messages").innerHTML =players[1-turn].name+", has won the game" ;
                                    disableBoard();
                                } else {
                                    document.getElementById("messages").innerHTML =players[turn].name+", Use your sign "+players[turn].sign;
                                }
                            }
                            this.setAttribute("sign", true) ;
                        });
                    }
                    boardDiv.appendChild(rowDiv[i]);
                }
                document.body.appendChild(boardDiv);
                var messageDiv = document.createElement('div');
                messageDiv.setAttribute('id','messages');
                messageDiv.innerHTML= players[0].name +', this is your turn';
                document.body.appendChild(messageDiv);

            }
        }


        function isWinner(board){
            for(var i=0; i< wins.length; i++){
                var a, b, c;

                a = board[wins[i][0]];
                b = board[wins[i][1]];
                c = board[wins[i][2]];

                console.log(a+":"+b+":"+c);

                if(a == b && a == c && a != 0){
                    return a;
                }
            }
            return false;
        }


        function disableBoard(){
            for(i=0; i<3; i++){
                for(j=0;j<3; j++){
                    document.getElementById("s" + i+j).setAttribute("sign", true);
                }
            }
        }

        var myBoard = new board();
        myBoard.drawBoard();
    }
