export async function GET(request: Request) {
  // placeholder
  /*
  Attention: Be aware that to adapt this data to the frontend, the length of the array must be
  a power of 2.
  In case of lack of players, this route must handle the exceptions and fill the array accordingly.
  */
  const draw = [
    {
      players: [
        {
          id: "1",
          name: "Player 1",
        },
        {
          id: "2",
          name: "Player 2",
        },
      ],
      winner: {
        id: 2,
        name: "Winner1",
      },
      result: [0, 0],
    },
    {
      players: [
        {
          id: "3",
          name: "Player 3",
        },
        {
          id: "4",
          name: "Player 4",
        },
      ],
      winner: {
        id: 2,
        name: "Winner2",
      },
    },
    {
      players: [
        {
          id: "3",
          name: "Player 3",
        },
        {
          id: "4",
          name: "Player 4",
        },
      ],
      winner: {
        id: 2,
        name: "Winner3",
      },
      date: "2021-01-04",
    },
    {
      players: [
        {
          id: "3",
          name: "Player 3",
        },
        {
          id: "4",
          name: "Player 4",
        },
      ],
    },
    {
      players: [
        {
          id: "3",
          name: "Player 3",
        },
        {
          id: "4",
          name: "Player 4",
        },
      ],
    },
    {
      players: [
        {
          id: "3",
          name: "Player 3",
        },
        {
          id: "4",
          name: "Player 4",
        },
      ],
    },
    {
      players: [
        {
          id: "3",
          name: "Player 3",
        },
        {
          id: "4",
          name: "Player 4",
        },
      ],
    },
    {
      players: [
        {
          id: "3",
          name: "Player 3",
        },
        {
          id: "4",
          name: "Player 4",
        },
      ],
    },
    {
      players: [
        {
          id: "3",
          name: "Player 3",
        },
        {
          id: "4",
          name: "Player 4",
        },
      ],
      date: "2021-01-04",
    },
    {
      players: [
        {
          id: "3",
          name: "Player 3",
        },
        {
          id: "4",
          name: "Player 4",
        },
      ],
      date: "2021-01-04",
    },
    {
      date: "2021-01-04",
    },
    {
      date: "2021-01-04",
    },
    {
      date: "2021-01-02",
    },
    {
      date: "2021-01-02",
    },
    {
      date: "2021-01-01",
    },
    {
      date: "2021-01-01",
    },
    {
      date: "2021-01-01",
    },
    {
      date: "2021-01-01",
    },
    {
      date: "2021-01-01",
    },
    {
      date: "2021-01-01",
    },
    {
      date: "2021-01-01",
    },
    {
      date: "2021-01-01",
    },
    {
      date: "2021-01-01",
    },
    {
      date: "2021-01-01",
    },
    {
      date: "2021-01-01",
    },
    {
      date: "2021-01-01",
    },
    {
      date: "2021-01-01",
    },
    {
      date: "2021-01-01",
    },
    {
      date: "2021-01-01",
    },
    {
      date: "2021-01-01",
    },
    {
      date: "2021-01-01",
    },
  ];

  return new Response(JSON.stringify(draw), {
    headers: {
      "content-type": "application/json;charset=UTF-8",
    },
  });
}

export async function POST(request: Request) {
  // draw the tournament bracket
}
