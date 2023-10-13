export async function GET(request: Request) {
  // placeholders
  const players = [
    { id: 1, name: "Player 1" },
    { id: 2, name: "Player 2" },
    { id: 3, name: "Player 3" },
    { id: 4, name: "Player 4" },
  ];

  return new Response(JSON.stringify(players), {
    headers: { "content-type": "application/json" },
  });
}
