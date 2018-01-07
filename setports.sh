#!/bin/bash

echo "Enter startport (xxx0-xxx5 will be used) or press enter to use default ports (3000-3004)"
read startport

if ! [ "$startport" -eq "$startport" ] 2> /dev/null
then
    PORT0=3000
    PORT1=3001
    PORT2=3002
    PORT3=3003
    PORT4=3004
    echo "Falling back to default ports 3000, 3001, 3002, 3003, 3004"


else
    PORT0=$((startport))
    PORT1=$((startport + 1))
    PORT2=$((startport + 2))
    PORT3=$((startport + 3))
    PORT4=$((startport + 4))
fi
echo ""
echo "                        -----------------------"
echo "Web server will run on  http://localhost:${PORT0}  - User API ${PORT1} - Kanban API ${PORT2} - Realtime ${PORT3} - MongoDB on ${PORT4}"
echo "                        -----------------------"
echo ""

export DBWEBB_PORT_0=${PORT0}
export DBWEBB_PORT_1=${PORT1}
export DBWEBB_PORT_2=${PORT2}
export DBWEBB_PORT_3=${PORT3}
export DBWEBB_PORT_4=${PORT4}
export DBWEBB_DSN=mongodb://mongodb:${PORT4}/kanban

cat > ./.env << EOL
DBWEBB_PORT_0=${PORT0}
DBWEBB_PORT_1=${PORT1}
DBWEBB_PORT_2=${PORT2}
DBWEBB_PORT_3=${PORT3}
DBWEBB_DSN=mongodb://mongodb:${PORT4}/kanban
DBWEBB_MONGO_PORT=${PORT4}
EOL

# cat > ./config.js << EOL
cat > ./services/web/src/config.js << EOL
/**
 * Config
 */
const settings = {
    userUrl: 'http://localhost',
    userPort: ${PORT1},

    kanbanUrl: 'http://localhost',
    kanbanPort: ${PORT2},

    chatUrl: 'ws://localhost',
    chatPort: ${PORT3},
};

module.exports = settings;
EOL
