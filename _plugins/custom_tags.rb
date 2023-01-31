module Jekyll
  class IngredientTag < Liquid::Block
    def render(context)
      content = super
      context.registers[:site].data['ingredient'] = Kramdown::Document.new(content).to_html
      ""
    end
  end

  class MethodTag < Liquid::Block
    def render(context)
      content = super
      context.registers[:site].data['method'] = Kramdown::Document.new(content).to_html
      ""
    end
  end
end

Liquid::Template.register_tag("ingredient", Jekyll::IngredientTag)
Liquid::Template.register_tag("method", Jekyll::MethodTag)
