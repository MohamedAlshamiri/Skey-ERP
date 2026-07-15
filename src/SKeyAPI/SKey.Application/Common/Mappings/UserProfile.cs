using AutoMapper;
using SKey.Application.Common.Models.Users;
using SKey.Domain.Entities;

namespace SKey.Application.Common.Mappings;

public class UserProfile : Profile
{
    public UserProfile()
    {
        CreateMap<User, UserDto>()
            .ForMember(destination => destination.Id, options => options.MapFrom(source => source.Id))
            .ForMember(destination => destination.RoleId, options => options.MapFrom(source => source.RoleId))
            .ForMember(
                destination => destination.RoleName,
                options => options.MapFrom(source => source.Role != null ? source.Role.Name : null))
            .MaxDepth(1);

        CreateMap<CreateUserDto, User>()
            .ForMember(destination => destination.Id, options => options.Ignore())
            .ForMember(destination => destination.Password, options => options.Ignore())
            .ForMember(destination => destination.Role, options => options.Ignore());

        CreateMap<UpdateUserDto, User>()
            .ForMember(destination => destination.Id, options => options.Ignore())
            .ForMember(destination => destination.Password, options => options.Ignore())
            .ForMember(destination => destination.Role, options => options.Ignore());
    }
}
