using System.Collections.Generic;

namespace ItemsApp_API.Dtos
{
    public class CreatePurnchaseOrderInput
    {
        public string Name { get; set; }

        public List<PurnchaseOrderItemDto> OrderItems { get; set; } = new();
    }
}
