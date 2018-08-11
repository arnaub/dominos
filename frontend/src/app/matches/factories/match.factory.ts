import { Factory } from "rosie";
import { PLAYERS } from "../../players/models/mock-players";

export default new Factory().sequence("id").attrs({
  completed: false,
  created_at: () => new Date(),
  matchPlayers: () => {
    return PLAYERS.reduce((players, player) => {
      return [
        ...players,
        {
          id: player.id,
          player: player,
          score: []
        }
      ];
    }, []);
  }
});
