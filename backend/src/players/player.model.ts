export interface Player {
  id: string;
  name: string;
  avatarUrl: string;
  color?: string;
  wins?: number;
  loses?: number;
  totalGames?: number;
}
