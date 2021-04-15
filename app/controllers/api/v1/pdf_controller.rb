class PdfController < ActionController::Base

  def index
    respond_to do |format|
      format.pdf do
        render pdf: "post.pdf",
               template: "posts/pdf.html.erb",
               header: {
                 :margin => { :bottom => 10},
                 html: {
                   template: "posts/pdf_header.html.erb"
                 }
               },
               encoding: "utf8",
               layout: "pdf",
               margin: {
                 top: 20
               },
               :footer => { :right => 'Page: [page] of [topage]', :margin => { :top => 10}}
      end
    end
  end

end