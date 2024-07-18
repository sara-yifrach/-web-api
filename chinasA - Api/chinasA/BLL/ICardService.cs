using chinasA.Models;

namespace chinasA.BLL
{
    public interface ICardService
    {
        public Task<Card> GetCardById(int id);
        public Task<Card> AddCard(Card CardToAdd);
        public Task<Card> DeleteCard(int id);
        //public Task<List<Card>> GetCards();

        public Task<List<Costumer>> GetCardsForGift(int giftId);
        

    }
}
