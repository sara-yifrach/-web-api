using chinasA.Models;

namespace chinasA.DAL
{
    public interface ICardDal
    {
        public Task<Card> GetCardById(int id);
        //public Task<List<Card>> GetCards();
        public Task<Card> AddCard(Card CardToAdd);
        public Task<Card> DeleteCard(int id);
        //public Task<List<Costumer>> GetForGift();
        public Task<List<Costumer>> GetCardsForGift(int giftId);

    }
}
