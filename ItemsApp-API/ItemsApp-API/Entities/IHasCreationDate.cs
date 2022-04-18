using System;

namespace ItemsApp_API.Entities
{
    public interface IHasCreationDate
    {
        public DateTime CreationDate { get; set; }
    }
}
