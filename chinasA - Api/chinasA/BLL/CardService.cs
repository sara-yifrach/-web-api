using chinasA.DAL;
using chinasA.Models;

namespace chinasA.BLL
{
    public class CardService:ICardService
    {
        private readonly ICardDal cardDal;
        public CardService(ICardDal cardDal)
        {
            this.cardDal = cardDal;
        }
        public async Task<Card> GetCardById(int id)
        {
            return await cardDal.GetCardById(id);
        }
        public async Task<Card> AddCard(Card CardToAdd)
        {
            return await cardDal.AddCard(CardToAdd);
        }
        public async Task<Card> DeleteCard(int id)
        {
            return await cardDal.DeleteCard(id);
        }

        //public async Task<List<Card>> GetCards()
        //{
        //    return await cardDal.GetCards();
        //}

        public async Task<List<Costumer>> GetCardsForGift(int giftId)
        {
            return await cardDal.GetCardsForGift(giftId);
        }
       
    }
}
