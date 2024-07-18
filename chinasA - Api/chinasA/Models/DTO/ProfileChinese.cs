namespace chinasA.Models.DTO
{
   using AutoMapper;
    public class ProfileChinese : Profile
    {       
            public ProfileChinese()
            {
            CreateMap<CostumerDto, Costumer>().ReverseMap();
            CreateMap<DonatorDto, Donator>().ReverseMap();
            CreateMap<GiftDto, Gift>().ReverseMap();
            CreateMap<PurchaseDto, Purchase>().ReverseMap();
            CreateMap<CardDto, Card>().ReverseMap();
            CreateMap<WinnerDto, Winner>().ReverseMap();
            //CreateMap<CardDto, Card>().ForMember(purchase => purchase.Purchase, i => i.MapFrom(h => h.PurchaseId));

            //CreateMap<DonatorDto, Donator>()
            //    .ForMember(costumer => costumer, i => i.MapFrom(o => o.Name));
        }
    }

    }

